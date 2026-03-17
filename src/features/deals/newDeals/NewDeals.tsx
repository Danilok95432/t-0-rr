import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { IFormProps } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { InputDate } from '@/shared/ui/InputDate'

import styles from './new-deals.module.scss'
import { useAddNewDealQuery, useGetDealInfoQuery, useSaveDealInfoMutation } from '../api/dealsApi'
import { DealInfoSave } from '../table/config/dealsType'
import { formatDateToYYYYMMDD, getFirstValue } from '@/shared/helpers/helpers'

export const NewDeals: FC<IFormProps> = () => {
  const { handleCloseModal } = useModal()
  const { data: newOperationData } = useAddNewDealQuery()

  const newId = newOperationData?.id

  const { data: dealsLists } = useGetDealInfoQuery(newId ?? '') 

  const [saveNewDeal] = useSaveDealInfoMutation()

  const { control, handleSubmit, reset, formState: { isValid }, } = useForm<DealInfoSave>()

  const onSubmit: SubmitHandler<DealInfoSave> = async (data) => {
    const formData = new FormData()
    if (newId) formData.append('id', newId)
    formData.append('deal_date', data?.deal_date !== undefined ? formatDateToYYYYMMDD(data?.deal_date) : formatDateToYYYYMMDD(new Date()))
    formData.append('deal_short_name', data?.deal_short_name)
    formData.append('deal_name_full', data?.deal_name_full)
    formData.append('id_org', getFirstValue(data?.id_org))
    formData.append('id_case', getFirstValue(data?.id_case))
    formData.append('id_contragent', getFirstValue(data?.id_contragent))
    formData.append('dogovor_name', data?.dogovor_name)
    formData.append('deal_plan_rashod', data?.deal_plan_rashod)

    try {
      await saveNewDeal(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления операции:', error)
    }
    handleCloseModal()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.newDeals}>
      <div className={styles['main-info']}>
        <div className={styles.left}>
          <Controller
            name='deal_short_name'
            control={control}
            render={({ field }) => (
              <Input
                id='deal_short_name'
                label='Краткое название сделки'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />

          <Controller
            name='deal_name_full'
            control={control}
            render={({ field }) => (
              <TextArea
                id='deal_name_full'
                label='Полное название сделки'
                value={field.value}
                onChange={(text) => field.onChange(text)}
                className={styles.newDealsTextArea}
              />
            )}
          />

          <Controller
            name='id_case'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? [{ label: '', value: '' }]}
                options={dealsLists?.cases_list ?? []}
                label='Кейс'
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='id_org'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? [{ label: '', value: '' }]}
                options={dealsLists?.orgs_list ?? []}
                label='Организация с нашей стороны'
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='id_contragent'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? [{ label: '', value: '' }]}
                options={dealsLists?.contragents_list ?? []}
                label='Контрагент'
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='dogovor_name'
            control={control}
            render={({ field }) => (
              <Input
                id='dogovor_name'
                label='Название Договора'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />

          <Controller
            name='deal_date'
            control={control}
            render={({ field }) => (
              <InputDate
                date={field.value}
                label='Дата заключения Договора'
                onChange={(date) => field.onChange(date)}
                popperPlacement='left'
              />
            )}
          />

          <Controller
            name='deal_plan_rashod'
            control={control}
            render={({ field }) => (
              <Input
                id='deal_plan_rashod'
                label='Плановый расход сделки в рублях'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />
        </div>
      </div>

      <Button type='submit' label='Сохранить' mode='primary' disabled={!isValid} />
    </form>
  )
}
