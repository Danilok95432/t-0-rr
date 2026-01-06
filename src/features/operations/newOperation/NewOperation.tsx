/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from 'react'
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form'
import classNames from 'classnames'
import { TFormNewOperation } from '@/shared/types/forms'
import { IFormProps } from '@/shared/types/forms'

import { useModal } from '@/features/modal/hooks/useModal'

import { SelectC } from '@/shared/ui/Select'
import { Input } from '@/shared/ui/Input'
import { InputDate } from '@/shared/ui/InputDate'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'

import styles from './new-operation.module.scss'
import {
  useAddNewOperationQuery,
  useEditOperationQuery,
  useSaveOperationMutation,
} from '../api/operationsApi'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { Loader } from '@/shared/ui/Loader'
import { formatDateToYYYYMMDD, getFirstValue } from '@/shared/helpers/helpers'

export const NewOperation: FC<IFormProps> = ({ labelBadge }) => {
  const { handleCloseModal } = useModal()
  const { data: newOperationData, isLoading: isNewIdLoading } = useAddNewOperationQuery()

  const newId = newOperationData?.id

  const { data, isLoading: isFormDataLoading } = useEditOperationQuery(newId ? newId : skipToken)
  const [saveNewOperation] = useSaveOperationMutation()

  const { control, handleSubmit, reset, setValue } = useForm<TFormNewOperation>({
    defaultValues: {
      bank_id: '',
      summ: '',
      itemname: '',
      comment: '',
    },
  })

  const selectedDirection = useWatch({ control, name: 'directions_list' }) as any
  const selectedArticleExp = useWatch({ control, name: 'article_exps_list' }) as any

  const selectedOrg = useWatch({ control, name: 'orgs_list' }) as any
  const selectedContragent = useWatch({ control, name: 'contragents_list' }) as any
  const selectedCase = useWatch({ control, name: 'cases_list' }) as any

  const selectedOrgId =
    Array.isArray(selectedOrg) && selectedOrg[0]?.value ? selectedOrg[0].value : undefined

  const selectedContragentId =
    Array.isArray(selectedContragent) && selectedContragent[0]?.value
      ? selectedContragent[0].value
      : undefined

  const selectedCaseId =
    Array.isArray(selectedCase) && selectedCase[0]?.value ? selectedCase[0].value : undefined

  const selectedDirectionId =
    Array.isArray(selectedDirection) && selectedDirection[0]?.value
      ? selectedDirection[0].value
      : undefined

  const selectedArticleExpId =
    Array.isArray(selectedArticleExp) && selectedArticleExp[0]?.value
      ? selectedArticleExp[0].value
      : undefined

  const filteredArticles = useMemo(() => {
    if (!data?.articles_list) return []

    return data.articles_list.filter((article: any) => {
      const matchDirection = selectedDirectionId
        ? String(article.id_direction) === String(selectedDirectionId)
        : true

      const matchArticleExp = selectedArticleExpId
        ? String(article.id_article_exp) === String(selectedArticleExpId)
        : true

      return matchDirection && matchArticleExp
    })
  }, [data?.articles_list, selectedDirectionId, selectedArticleExpId])

  const filteredOrgAccounts = useMemo(() => {
    if (!selectedOrgId || !data?.accounts_list) return []
    return data.accounts_list.filter((acc: any) => acc.id_org === selectedOrgId)
  }, [selectedOrgId, data?.accounts_list])

  const filteredContragentAccounts = useMemo(() => {
    if (!selectedContragentId || !data?.contragent_accounts_list) return []
    return data.contragent_accounts_list.filter(
      (acc: any) => acc.id_contragent === selectedContragentId
    )
  }, [selectedContragentId, data?.contragent_accounts_list])

  const defaultArticleExpOption = data?.article_exps_list
    ? data.article_exps_list.find((opt) => {
        const label = opt.label?.toLowerCase().trim()
        if (data.imported) {
          return label === 'косвенные'
        }
        return label === 'прямые'
      }) ?? null
    : null

  const filteredDeals = useMemo(() => {
    if (!data?.deals_list) return []
    if (!selectedOrgId || !selectedCaseId) return []
    return data.deals_list.filter((deal: any) => {
      return deal.id_org === selectedOrgId && deal.id_case === selectedCaseId
    })
  }, [data?.deals_list, selectedOrgId, selectedCaseId])

  useEffect(() => {
    setValue('accounts_list', [] as any, { shouldDirty: true })
  }, [selectedOrgId, setValue])

  useEffect(() => {
    setValue('articles_list', [] as any, { shouldDirty: true })
  }, [selectedDirectionId, selectedArticleExpId, setValue])

  useEffect(() => {
    setValue('contragent_accounts_list', [] as any, { shouldDirty: true })
  }, [selectedContragentId, setValue])

  useEffect(() => {
    setValue('deals_list', [] as any, { shouldDirty: true })
  }, [selectedOrgId, selectedCaseId, setValue])

  const onSubmit: SubmitHandler<TFormNewOperation> = async (data) => {
    const formData = new FormData()
    if (newId) formData.append('id', newId)
    formData.append('id_org', getFirstValue(data.orgs_list))
    formData.append('id_account', getFirstValue(data.accounts_list))
    formData.append('id_contragent', getFirstValue(data.contragents_list))
    formData.append('id_contragent_account', getFirstValue(data.contragent_accounts_list))
    formData.append('id_deal', getFirstValue(data.deals_list))
    formData.append('id_case', getFirstValue(data.cases_list))
    formData.append('id_direction', getFirstValue(data.directions_list))
    formData.append('id_article', getFirstValue(data.articles_list))
    formData.append('id_rashod', getFirstValue(data.rashods_list))
    formData.append('itemdate', formatDateToYYYYMMDD(data?.date))
    formData.append('bank_id', data?.bank_id)
    formData.append('summ', data?.summ)
    formData.append('itemname', data?.itemname)
    formData.append('comment', data?.comment)

    try {
      await saveNewOperation(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления операции:', error)
    }
    handleCloseModal()
    reset()
  }

  if (isNewIdLoading || isFormDataLoading || !data) {
    return <Loader />
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOperation}>
      {labelBadge && <Badge label={labelBadge} />}

      <div className={styles['main-info']}>
        <div className={classNames(styles.left, styles.hasArrow)}>
          <Controller
            name='orgs_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.orgs_list ?? []}
                values={field.value ?? [{ label: '', value: '' }]}
                label='Организация'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />

          <Controller
            name='accounts_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredOrgAccounts}
                values={field.value ?? [{ value: '', label: '', id_org: '' }]}
                label='Счет организации'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='contragents_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.contragents_list ?? []}
                values={field.value ?? [{ value: '', label: '', inn: '' }]}
                label='Контрагент'
                onChange={field.onChange}
                className={styles.addOperation__select}
                searchable={true}
              />
            )}
          />

          <Controller
            name='contragent_accounts_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredContragentAccounts}
                values={field.value ?? [{ value: '', label: '', id_contragent: '' }]}
                label='Счет контрагента'
                onChange={field.onChange}
                className={styles.addOperation__select}
              />
            )}
          />
        </div>
      </div>

      <div className={styles['extra-info']}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <InputDate
                  date={field.value}
                  label='Дата операции'
                  onChange={(date) => field.onChange(date)}
                  popperPlacement='bottom-start'
                />
              )}
            />

            <Controller
              name='bank_id'
              control={control}
              render={({ field }) => (
                <Input
                  id='bank_id'
                  label='Банковский ID (идентификатор)'
                  value={field.value}
                  onChange={(text) => field.onChange(text)}
                  className={styles.idInput}
                  maxLength={25}
                />
              )}
            />
          </div>

          <Controller
            name='summ'
            control={control}
            render={({ field }) => (
              <Input
                id='summ'
                label='Сумма операции'
                extraLabel='RUB — Рубли РФ'
                value={field.value}
                onChange={(text) => field.onChange(text)}
                className={styles.sumInput}
                hasResetIcon={false}
                maxLength={35}
              />
            )}
          />

          <Controller
            name='itemname'
            control={control}
            render={({ field }) => (
              <TextArea
                id='itemname'
                label='Наименование операции'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <TextArea
                id='comment'
                label='Комментарий сотрудника'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='cases_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.cases_list ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Кейс'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />

          <Controller
            name='deals_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredDeals}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Сделка'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />

          <Controller
            name='directions_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.directions_list ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Направление операции'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />
          {selectedDirectionId === '2' && (
            <Controller
              name='article_exps_list'
              control={control}
              render={({ field }) => (
                <SelectC
                  options={data?.article_exps_list ?? []}
                  values={field.value ?? []}
                  value={defaultArticleExpOption}
                  disabled={true}
                  label='Тип расходов'
                  onChange={field.onChange}
                  className={styles['main-info-select']}
                />
              )}
            />
          )}
          <Controller
            name='articles_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredArticles}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Статья / подстатья'
                onChange={field.onChange}
                className={styles['main-info-select']}
              />
            )}
          />
          {selectedDirectionId === '2' && (
            <Controller
              name='rashods_list'
              control={control}
              render={({ field }) => (
                <SelectC
                  options={data?.rashods_list ?? []}
                  values={field.value ?? [{ value: field.value, label: field.value }]}
                  label='Расходы на операцию несет'
                  onChange={field.onChange}
                  className={styles['main-info-select']}
                />
              )}
            />
          )}
        </div>
      </div>

      <Button
        type='submit'
        label='Создать операцию'
        mode='primary'
        disabled={
          selectedOrg === undefined ||
          selectedContragent === undefined ||
          selectedDirection === undefined
        }
      />
    </form>
  )
}
