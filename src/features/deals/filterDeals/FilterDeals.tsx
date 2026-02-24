/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'
import styles from './filter-deals.module.scss'
import {
  useGetAllFiltersQuery,
  useSaveFiltersMutation,
} from '@/features/filtersMenu/api/filtersApi'
import type { MultiSelOption, SelOption, TFormFilterDealsMenu } from '@/shared/types/forms'
import { useFilters } from '@/features/filtersMenu/context/filtersContext'
import { ControlledDateInput } from '@/widgets/ControlledDateInput/controlled-date-input'
import { Input } from '@/shared/ui/Input'

export const FilterDeals = () => {
  const { handleCloseFilterMenu } = useFiltersMenu()
  const { data: filterData } = useGetAllFiltersQuery()
  const [saveFilters] = useSaveFiltersMutation()
  const { filters: contextFilters, setFilters } = useFilters()

  const EMPTY_VALUES: TFormFilterDealsMenu = {
    rememberChoice: false,
    dateDogovor: undefined,
    dateApply: undefined,
    org: [],
    contragent: [],
    cases: '',
    deal_name: '',
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

  const getSavedValues = React.useCallback((): Partial<TFormFilterDealsMenu> => {
    const defaultValues: Partial<TFormFilterDealsMenu> = {
      rememberChoice: false,
    }

    if (filterData) {
      if (filterData.dateDogovor) {
        defaultValues.dateDogovor = parseServerDate(filterData.dateDogovor)
      }

      if (filterData.dateApply) {
        defaultValues.dateApply = parseServerDate(filterData.dateApply)
      }

      const multiSelectFields = [
        { key: 'org' as const, data: filterData.org },
        { key: 'contragent' as const, data: filterData.contragent },
      ]

      multiSelectFields.forEach(({ key, data }) => {
        const selectedValues = data?.filter((o) => o.selected).map((o) => o.value)
        if (selectedValues?.length) {
          defaultValues[key] = selectedValues
        }
      })

      const singleSelectFields = [{ key: 'cases' as const, data: filterData.cases }]

      singleSelectFields.forEach(({ key, data }) => {
        if (data?.length) {
          defaultValues[key] = data[0].value
        }
      })
    }

    return defaultValues
  }, [filterData])

  const getInitialValues = (): TFormFilterDealsMenu => {
    const savedValues = getSavedValues()

    return {
      ...EMPTY_VALUES,
      ...savedValues,
      ...contextFilters,
      rememberChoice: false,
    }
  }

  const methods = useForm<TFormFilterDealsMenu>({
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const { control, handleSubmit, getValues, reset } = methods

  React.useEffect(() => {
    const initialValues = getInitialValues()
    reset(initialValues)
  }, [filterData, contextFilters, reset])

  const dateApplyISOString = (date: Date | string | undefined): string => {
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

  const extractValuesForSave = (data: TFormFilterDealsMenu) => {
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
        const isoString = dateApplyISOString(value)
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

  const onSubmit: SubmitHandler<TFormFilterDealsMenu> = async (data) => {
    try {
      const processedData = {
        ...data,
        dateDogovor: data.dateDogovor ? dateApplyISOString(data.dateDogovor) : undefined,
        dateApply: data.dateApply ? dateApplyISOString(data.dateApply) : undefined,
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

  const handleReset = () => {
    // reset(EMPTY_VALUES)
    // setFilters(null)
    handleCloseFilterMenu()
  }

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
      values.dateDogovor ||
      values.dateApply ||
      values.org?.length ||
      values.contragent?.length ||
      values.cases ||
      values.deal_name

    if (!hasAnyFilter) return

    hasAppliedSavedFilters.current = true

    handleSubmit(onSubmit)()
  }, [filterData, getValues, handleSubmit])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filterOperations}>
        <ControlledDateInput
          className={styles.date}
          name='dateDogovor'
          dateFormat='yyyy-MM-dd'
          placeholder='Дата договора'
        />

        <ControlledDateInput
          className={styles.date}
          name='dateApply'
          dateFormat='yyyy-MM-dd'
          placeholder='Дата совершения'
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
          name='deal_name'
          control={control}
          render={({ field }) => (
            <Input
              id='deal_name'
              label='Название сделки'
              value={field.value}
              hasResetIcon={false}
              onChange={field.onChange}
              className={styles.nameInput}
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
          <Button mode='secondary' label='Сбросить фильтр' type='button' disabled onClick={handleReset} />
        </div>
      </form>
    </FormProvider>
  )
}
