/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from 'react'
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form'
import { IFormProps, TFormGroupProccesing } from '@/shared/types/forms'

import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'

import styles from './group-proccesing.module.scss'
import { SelectC } from '@/shared/ui/Select'
import { useGetOptionsGroupOperationQuery } from '../api/operationsApi'

export const GroupProccesing: FC<IFormProps> = ({ labelBadge, elements }) => {
  const { control, handleSubmit, setValue } = useForm<TFormGroupProccesing>({})
  const { data } = useGetOptionsGroupOperationQuery(null)
  console.log(elements)

  const selectedCase = useWatch({ control, name: 'cases_list' }) as any

  const selectedCaseId =
    Array.isArray(selectedCase) && selectedCase[0]?.value ? selectedCase[0].value : undefined

  const filteredDeals = useMemo(() => {
    if (!data?.deals_list) return []
    if (!selectedCaseId) return []
    return data.deals_list.filter((deal: any) => {
      return deal.id_case === selectedCaseId
    })
  }, [data?.deals_list, selectedCaseId])

  useEffect(() => {
    setValue('deals_list', [] as any, { shouldDirty: true })
  }, [selectedCaseId, setValue])

  const onSubmit: SubmitHandler<TFormGroupProccesing> = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.groupProccessOperation}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {labelBadge && <Badge label={labelBadge} />}
        <div className={styles.infoBlock}>
          <p className={styles.title}>Групповая обработка операций</p>
          <p>{`Всего выбрано операций: ${elements?.length}`}</p>
        </div>
        <div className={styles.controls}>
          <Controller
            name='cases_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.cases_list ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить кейс'
                onChange={field.onChange}
                className={styles.select}
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
                label='Установить сделку'
                onChange={field.onChange}
                className={styles.select}
              />
            )}
          />

          <Controller
            name='articles_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.articles_list ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить статью'
                onChange={field.onChange}
                className={styles.select}
              />
            )}
          />

          <Controller
            name='subarticles_list'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.subarticles_list ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить подстатью'
                onChange={field.onChange}
                className={styles.select}
              />
            )}
          />

          <div className={styles.formContentBottom}>
            <Button type='submit' label='Сохранить изменения' mode='primary' />
            <Button type='button' label='Отменить' mode='secondary' />
          </div>
        </div>
      </form>
    </div>
  )
}
