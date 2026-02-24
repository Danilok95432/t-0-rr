/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { TFormFilterOperationsMenu } from '@/shared/types/forms'
import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'
import styles from './filter-operations.module.scss'
import {
  useGetAllFiltersQuery,
  useSaveFiltersMutation,
} from '@/features/filtersMenu/api/filtersApi'
import type { MultiSelOption, SelOption } from '@/shared/types/forms'
import { useFilters } from '@/features/filtersMenu/context/filtersContext'
import { ControlledDateInput } from '@/widgets/ControlledDateInput/controlled-date-input'

export const FilterOperations = () => {
  const { handleCloseFilterMenu } = useFiltersMenu()
  const { data: filterData } = useGetAllFiltersQuery()
  const [saveFilters] = useSaveFiltersMutation()
  const { filters: contextFilters, setFilters } = useFilters()

  const EMPTY_VALUES: TFormFilterOperationsMenu = {
    rememberChoice: false,
    dateFrom: undefined,
    dateTo: undefined,
    org: [],
    account: [],
    contragent: [],
    directions: [],
    article: '',
    cases: '',
    deals: '',
  }

  const parseServerDate = (value?: string): Date | undefined => {
    if (!value) return undefined

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      return isNaN(date.getTime()) ? undefined : date
    }

    const date = new Date(value)
    return isNaN(date.getTime()) ? undefined : date
  }

  const getSavedValues = React.useCallback((): Partial<TFormFilterOperationsMenu> => {
    const defaultValues: Partial<TFormFilterOperationsMenu> = {
      rememberChoice: false,
    }

    if (filterData) {
      if (filterData.dateFrom) {
        defaultValues.dateFrom = parseServerDate(filterData.dateFrom)
      }

      if (filterData.dateTo) {
        defaultValues.dateTo = parseServerDate(filterData.dateTo)
      }

      const multiSelectFields = [
        { key: 'org' as const, data: filterData.org },
        { key: 'account' as const, data: filterData.account },
        { key: 'contragent' as const, data: filterData.contragent },
        { key: 'directions' as const, data: filterData.directions },
      ]

      multiSelectFields.forEach(({ key, data }) => {
        const selectedValues = data?.filter((o) => o.selected).map((o) => o.value)
        if (selectedValues?.length) {
          defaultValues[key] = selectedValues
        }
      })

      const singleSelectFields = [
        { key: 'article' as const, data: filterData.article },
        { key: 'cases' as const, data: filterData.cases },
        { key: 'deals' as const, data: filterData.deals },
      ]

      singleSelectFields.forEach(({ key, data }) => {
        if (data?.length) {
          defaultValues[key] = data[0].value
        }
      })
    }

    return defaultValues
  }, [filterData])

  const getInitialValues = (): TFormFilterOperationsMenu => {
    const savedValues = getSavedValues()

    return {
      ...EMPTY_VALUES,
      ...savedValues,
      ...contextFilters,
      rememberChoice: false,
    }
  }

  const methods = useForm<TFormFilterOperationsMenu>({
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const { control, handleSubmit, setValue, getValues, reset } = methods

  const selectedDirection = useWatch({ control, name: 'directions' }) as any
  const selectedOrg = useWatch({ control, name: 'org' }) as any
  const selectedCase = useWatch({ control, name: 'cases' }) as any

  const selectedOrgId = selectedOrg && selectedOrg.length > 0 ? selectedOrg[0] : undefined
  const selectedCaseId =
    selectedCase && selectedCase.length > 0 ? selectedCase[0]?.value : undefined
  const selectedDirectionId =
    selectedDirection && selectedDirection.length > 0 ? selectedDirection[0] : undefined

  const filteredArticles = useMemo(() => {
    if (!filterData?.article) return []

    return filterData.article.filter((article: any) => {
      const matchDirection = selectedDirectionId
        ? String(article.id_direction) === String(selectedDirectionId)
        : true

      return matchDirection
    })
  }, [filterData?.article, selectedDirectionId])

  const filteredOrgAccounts = useMemo(() => {
    if (!selectedOrgId || !filterData?.account) return []
    return filterData.account.filter((acc: any) => acc.id_org === selectedOrgId)
  }, [selectedOrgId, filterData?.account])

  const filteredDeals = useMemo(() => {
    if (!filterData?.deals) return []
    if (!selectedOrgId) return []
    return filterData.deals.filter((deal: any) => {
      const orgMatch = deal.id_org === selectedOrgId
      if (!orgMatch) return false
      if (selectedCaseId) {
        return deal.id_case === selectedCaseId
      }
      return true
    })
  }, [filterData?.deals, selectedOrgId, selectedCaseId])

  useEffect(() => {
    setValue('account', [] as any, { shouldDirty: true })
  }, [selectedOrgId, setValue])

  useEffect(() => {
    setValue('article', [] as any, { shouldDirty: true })
  }, [selectedDirectionId, setValue])

  useEffect(() => {
    setValue('deals', [] as any, { shouldDirty: true })
  }, [selectedOrgId, setValue])

  React.useEffect(() => {
    const initialValues = getInitialValues()
    reset(initialValues)
  }, [filterData, contextFilters, reset])

  const dateToISOString = (date: Date | string | undefined): string => {
    if (!date) return ''

    try {
      const dateObj = date instanceof Date ? date : new Date(date)

      if (isNaN(dateObj.getTime())) return ''

      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    } catch (error) {
      console.error('Error converting date to ISO:', error)
      return ''
    }
  }

  const handleMultiSelectChange = (field: any) => (selectedOptions: any) => {
    if (Array.isArray(selectedOptions)) {
      const values = selectedOptions.map((option) => option.value)
      field.onChange(values)
    } else {
      field.onChange([])
    }
  }

  const extractValuesForSave = (data: TFormFilterOperationsMenu) => {
    const result: Record<string, string> = {}

    const extractValue = (value: unknown): string[] => {
      if (!value) return []

      if (Array.isArray(value)) {
        return value
          .map((item) => {
            if (typeof item === 'string') return item
            if (item && typeof item === 'object' && 'value' in item) {
              return item.value as string
            }
            return ''
          })
          .filter(Boolean)
      }

      if (value && typeof value === 'object' && 'value' in value) {
        return [value.value as string]
      }

      if (typeof value === 'string') {
        return [value]
      }

      if (value instanceof Date) {
        const isoString = dateToISOString(value)
        return isoString ? [isoString] : []
      }

      return []
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'rememberChoice') return

      const values = extractValue(value)
      if (values.length > 0) {
        const multiSelectFields = ['org', 'account', 'contragent', 'directions']
        if (multiSelectFields.includes(key)) {
          result[key] = values.join(',')
        } else {
          result[key] = values[0]
        }
      }
    })

    return result
  }

  const onSubmit: SubmitHandler<TFormFilterOperationsMenu> = async (data) => {
    try {
      const processedData = {
        ...data,
        dateFrom: data.dateFrom ? dateToISOString(data.dateFrom) : undefined,
        dateTo: data.dateTo ? dateToISOString(data.dateTo) : undefined,
      }

      setFilters(processedData)

      if (data.rememberChoice) {
        const filterValues = extractValuesForSave(data)
        const formData = new FormData()

        Object.entries(filterValues).forEach(([key, value]) => {
          if (value && value.trim() !== '') {
            formData.append(key, value)
          }
        })
        await saveFilters(formData).unwrap()
      }

      handleCloseFilterMenu()
    } catch (error) {
      console.error('Ошибка при сохранении фильтров:', error)
    }
  }

  // const handleReset = () => {
  //   reset(EMPTY_VALUES)

  //
  //   setFilters(null)

  //
  //   handleCloseFilterMenu()
  // }

  const findLabelByValue = (
    value: string,
    options: MultiSelOption[] | SelOption[] | undefined,
  ): string => {
    if (!options || !value) return value

    const option = options.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  const getSelectValues = (
    fieldValue: string[] | string | undefined,
    isMulti: boolean,
    options: MultiSelOption[] | SelOption[] | undefined,
  ) => {
    if (!fieldValue) return []

    if (isMulti && Array.isArray(fieldValue)) {
      return fieldValue.map((val, index) => {
        const label = findLabelByValue(val, options)
        return {
          value: val,
          label: label,
          key: `${val}-${index}`,
        }
      })
    }

    if (!Array.isArray(fieldValue) && fieldValue) {
      const label = findLabelByValue(fieldValue, options)
      return [
        {
          value: fieldValue,
          label: label,
          key: fieldValue,
        },
      ]
    }

    return []
  }

  const getOptions = (options: MultiSelOption[] | SelOption[] | undefined) => {
    if (!options) return []

    return options.map((option, index) => ({
      ...option,
      key: `${option.value}-${index}`,
    }))
  }

  const hasAppliedSavedFilters = React.useRef(false)

  React.useEffect(() => {
    if (!filterData) return
    if (hasAppliedSavedFilters.current) return

    const values = getValues()

    const hasAnyFilter =
      values.dateFrom ||
      values.dateTo ||
      values.org?.length ||
      values.account?.length ||
      values.contragent?.length ||
      values.directions?.length ||
      values.article ||
      values.cases ||
      values.deals

    if (!hasAnyFilter) return

    hasAppliedSavedFilters.current = true

    handleSubmit(onSubmit)()
  }, [filterData, getValues, handleSubmit])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filterOperations}>
        <ControlledDateInput
          className={styles.date}
          name='dateFrom'
          dateFormat='yyyy-MM-dd'
          placeholder='Дата от'
        />

        <ControlledDateInput
          className={styles.date}
          name='dateTo'
          dateFormat='yyyy-MM-dd'
          placeholder='Дата до'
        />

        <Controller
          name='org'
          control={control}
          render={({ field }) => (
            <SelectC
              options={getOptions(filterData?.org)}
              values={getSelectValues(field.value, true, filterData?.org)}
              label='Организации'
              onChange={handleMultiSelectChange(field)}
              className={styles.select}
              multiselect
            />
          )}
        />

        <Controller
          name='account'
          control={control}
          render={({ field }) => (
            <SelectC
              options={filteredOrgAccounts}
              values={getSelectValues(field.value, true, filterData?.account)}
              label='Счета организаций'
              onChange={handleMultiSelectChange(field)}
              className={styles.select}
              multiselect
            />
          )}
        />

        <Controller
          name='contragent'
          control={control}
          render={({ field }) => (
            <SelectC
              options={getOptions(filterData?.contragent)}
              values={getSelectValues(field.value, true, filterData?.contragent)}
              label='Контрагент'
              onChange={handleMultiSelectChange(field)}
              className={styles.select}
              multiselect
            />
          )}
        />

        <Controller
          name='directions'
          control={control}
          render={({ field }) => (
            <SelectC
              options={getOptions(filterData?.directions)}
              values={getSelectValues(field.value, true, filterData?.directions)}
              label='Направления'
              onChange={handleMultiSelectChange(field)}
              className={styles.select}
              multiselect
            />
          )}
        />

        <Controller
          name='article'
          control={control}
          render={({ field }) => (
            <SelectC
              options={filteredArticles}
              values={getSelectValues(field.value, false, filterData?.article)}
              label='Статья и подстатья'
              onChange={field.onChange}
              className={styles.select}
            />
          )}
        />

        <Controller
          name='cases'
          control={control}
          render={({ field }) => (
            <SelectC
              options={getOptions(filterData?.cases)}
              values={getSelectValues(field.value, false, filterData?.cases)}
              label='Кейс'
              onChange={field.onChange}
              className={styles.select}
            />
          )}
        />

        <Controller
          name='deals'
          control={control}
          render={({ field }) => (
            <SelectC
              options={filteredDeals}
              values={getSelectValues(field.value, false, filterData?.deals)}
              label='Сделка'
              onChange={field.onChange}
              className={styles.select}
            />
          )}
        />

        <Controller
          name='rememberChoice'
          control={control}
          render={({ field }) => (
            <CheckBox
              label='Запомнить выбор'
              checked={field.value}
              onChange={(isChecked) => field.onChange(isChecked)}
            />
          )}
        />

        <div className={styles['buttons-wrapper']}>
          <Button mode='primary' label='Применить' type='submit' />
          {/* <Button mode='secondary' label='Сбросить фильтр' type='button' onClick={handleReset} /> */}
        </div>
      </form>
    </FormProvider>
  )
}
