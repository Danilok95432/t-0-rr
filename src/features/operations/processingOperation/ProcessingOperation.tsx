/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form'
import classNames from 'classnames'
import { TFormNewOperation, TFormProcessingOperation } from '@/shared/types/forms'
import { IFormProps } from '@/shared/types/forms'

import { useModal } from '@/features/modal/hooks/useModal'
import { SelectC } from '@/shared/ui/Select'
import { Input } from '@/shared/ui/Input'
import { InputDate } from '@/shared/ui/InputDate'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'
import { TableProcessingOperation } from './tableProcessing/tableProcessingOperation'

import styles from './processing-operation.module.scss'
import { useEditOperationQuery, useSaveOperationMutation } from '../api/operationsApi'
import { Loader } from '@/shared/ui/Loader'
import { formatDateToYYYYMMDD, getFirstValue } from '@/shared/helpers/helpers'

type reqProps = {
  id: string
}

export const ProcessingOperation: FC<IFormProps & reqProps> = ({ id }) => {
  const { handleCloseModal } = useModal()
  const [isInitialized, setIsInitialized] = useState(false)
  const { control, handleSubmit, reset, setValue } = useForm<
    TFormNewOperation & TFormProcessingOperation
  >()

  const { data, isLoading: isFormDataLoading } = useEditOperationQuery(id)
  const [saveNewOperation] = useSaveOperationMutation()

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

  const filteredDeals = useMemo(() => {
    if (!data?.deals_list) return []
    if (!selectedOrgId || !selectedCaseId) return []
    return data.deals_list.filter((deal: any) => {
      return deal.id_org === selectedOrgId && deal.id_case === selectedCaseId
    })
  }, [data?.deals_list, selectedOrgId, selectedCaseId])

  const defaultArticleExpOption = data?.article_exps_list
    ? data.article_exps_list.find((opt) => {
        const label = opt.label?.toLowerCase().trim()
        if (data.imported) {
          return label === 'косвенные'
        }
        return label === 'прямые'
      }) ?? null
    : null

  useEffect(() => {
    if (!isInitialized) return
    setValue('accounts_list', [] as any, { shouldDirty: true })
  }, [isInitialized, selectedOrgId, setValue])

  useEffect(() => {
  if (!isInitialized) return
  setValue('articles_list', [] as any, { shouldDirty: true })
}, [isInitialized, selectedDirectionId, selectedArticleExpId, setValue])

  useEffect(() => {
    if (!isInitialized) return
    setValue('contragent_accounts_list', [] as any, { shouldDirty: true })
  }, [isInitialized, selectedContragentId, setValue])

  useEffect(() => {
    if (!isInitialized) return
    setValue('deals_list', [] as any, { shouldDirty: true })
  }, [selectedOrgId, selectedCaseId, setValue, isInitialized])

  const onSubmit: SubmitHandler<TFormNewOperation> = async (data) => {
    const formData = new FormData()
    formData.append('id', id)
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

  useEffect(() => {
    if (!data) return
    const orgOptions = data.orgs_list ?? []
    const accountOptions = data.accounts_list ?? []
    const contragentOptions = data.contragents_list ?? []
    const contragentAccountOptions = data.contragent_accounts_list ?? []
    const caseOptions = data.cases_list ?? []
    const dealOptions = data.deals_list ?? []
    const directionOptions = data.directions_list ?? []
    const articleExpsOptions = data.article_exps_list ?? []
    const articleOptions = data.articles_list ?? []
    const rashodOptions = data.rashods_list ?? []

    const orgOption = orgOptions[0]
    const contragentOption = contragentOptions[0]
    const caseOption = caseOptions[0]
    const directionOption = directionOptions[0]
    const articleExpsOption = articleExpsOptions[0]
    const articleOption = articleOptions[0]
    const rashodOption = rashodOptions[0]

    // счета организации — только для выбранной org
    let orgAccounts = accountOptions
    if (orgOption) {
      orgAccounts = accountOptions.filter(
        (acc: any) => String(acc.id_org) === String(orgOption.value)
      )
    }
    const accountOption = orgAccounts[0]

    // счета контрагента — только для выбранного contragent
    let contragentAccounts = contragentAccountOptions
    if (contragentOption) {
      contragentAccounts = contragentAccountOptions.filter(
        (acc: any) => String(acc.id_contragent) === String(contragentOption.value)
      )
    }
    const contragentAccountOption = contragentAccounts[0]

    // сделки — только для выбранных org + case
    let dealsForOrgCase = dealOptions
    if (orgOption && caseOption) {
      dealsForOrgCase = dealOptions.filter(
        (deal: any) =>
          String(deal.id_org) === String(orgOption.value) &&
          String(deal.id_case) === String(caseOption.value)
      )
    }
    const dealOption = dealsForOrgCase[0]

    reset({
      // селекты — ВСЕГДА массив выбранных опций
      orgs_list: orgOption ? [orgOption] : [],
      accounts_list: accountOption ? [accountOption] : [],
      contragents_list: contragentOption ? [contragentOption] : [],
      contragent_accounts_list: contragentAccountOption ? [contragentAccountOption] : [],
      cases_list: caseOption ? [caseOption] : [],
      deals_list: dealOption ? [dealOption] : [],
      directions_list: directionOption ? [directionOption] : [],
      article_exps_list: articleExpsOption ? [articleExpsOption] : [],
      articles_list: articleOption ? [articleOption] : [],
      rashods_list: rashodOption ? [rashodOption] : [],

      // простые поля
      date: data.date ? new Date(data.date) : undefined,
      bank_id: data.bank_id ?? '',
      summ: data.summ ?? '',
      itemname: data.itemname ?? '',
      comment: data.comment ?? '',

      // деление операции — пока просто заполняем суммой
      initialAmount: '',
      retainedAmount: '',
    } as any)

    setIsInitialized(true)
  }, [data, reset])

  if (isFormDataLoading || !data) {
    return <Loader />
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOperation}>
      <div className={styles['main-info']}>
        <div className={classNames(styles.left, styles.hasArrow)}>
          <Controller
            name='orgs_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.orgs_list ?? []}
                values={field.value ?? []}
                label='Организация'
                onChange={field.onChange}
                className={styles['main-info-SelectC']}
              />
            )}
          />

          <Controller
            name='accounts_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredOrgAccounts}
                values={field.value ?? []}
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
                values={field.value ?? []}
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
                values={field.value ?? []}
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
                values={field.value ?? []}
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
                values={field.value ?? []}
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
                values={field.value ?? []}
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
                values={field.value ?? []}
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
        label='Сохранить'
        mode='primary'
        disabled={
          (selectedOrg && (selectedOrg[0].value === 0 || selectedOrg === undefined)) ||
          (selectedContragent &&
            (selectedContragent[0].value === 0 || selectedContragent === undefined)) ||
          (selectedDirection &&
            (selectedDirection === undefined || selectedDirection[0].value === 0))
        }
      />

      <h3 className={styles.subTitle}>Деление операции</h3>

      <div className={styles.sum_block}>
        <Controller
          name='initialAmount'
          control={control}
          render={({ field }) => (
            <Input
              id='initialAmount'
              label='Первоначальная сумма'
              value={field.value}
              onChange={(text) => field.onChange(text)}
              className={styles.idInput}
              maxLength={25}
              disabled
            />
          )}
        />
        <Controller
          name='retainedAmount'
          control={control}
          render={({ field }) => (
            <Input
              id='retainedAmount'
              label='Нераспределенная сумма'
              value={field.value}
              onChange={(text) => field.onChange(text)}
              className={styles.idInput}
              maxLength={25}
              disabled
            />
          )}
        />
      </div>

      <TableProcessingOperation />

      <div className={styles.select_block}>
        <Controller
          name='counterpartyDivision'
          control={control}
          render={({ field }) => (
            <SelectC
              options={[]}
              values={field.value ? [{ value: field.value, label: field.value }] : []}
              label='Контрагент'
              onChange={field.onChange}
              className={styles.addOperation__SelectC}
            />
          )}
        />

        <Controller
          name='caseDivision'
          control={control}
          render={({ field }) => (
            <SelectC
              options={[]}
              values={field.value ? [{ value: field.value, label: field.value }] : []}
              label='Кейс / сделка'
              onChange={field.onChange}
              className={styles['main-info-SelectC']}
            />
          )}
        />

        <Controller
          name='sumOperationDivision'
          control={control}
          render={({ field }) => (
            <Input
              id='sumOperation'
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
          name='counterpartyAccountDivision'
          control={control}
          render={({ field }) => (
            <SelectC
              options={[]}
              values={field.value ? [{ value: field.value, label: field.value }] : []}
              label='Счет контрагента'
              onChange={field.onChange}
              className={styles.addOperation__SelectC}
            />
          )}
        />

        <Controller
          name='articleDivision'
          control={control}
          render={({ field }) => (
            <SelectC
              options={[]}
              values={field.value ? [{ value: field.value, label: field.value }] : []}
              label='Статья / подстатья'
              onChange={field.onChange}
              className={styles['main-info-SelectC']}
            />
          )}
        />
      </div>

      <Button label='Закрыть форму деления' mode='secondary' className={styles.division_btn} />
    </form>
  )
}
