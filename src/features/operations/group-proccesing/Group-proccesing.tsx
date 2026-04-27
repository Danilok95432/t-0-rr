/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from 'react'
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form'
import { IFormProps, TFormGroupProccesing } from '@/shared/types/forms'

import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'

import styles from './group-proccesing.module.scss'
import { SelectC } from '@/shared/ui/Select'
import {
  useGetOptionsGroupOperationQuery,
  useSaveOptionsGroupOperationMutation,
} from '../api/operationsApi'
import { toast } from 'react-toastify'

type ActionsProps = {
  removeMarks: (arg0: (string | number)[]) => void
}

export const GroupProccesing: FC<IFormProps & ActionsProps> = ({
  labelBadge,
  elements,
  removeMarks,
}) => {
  const { control, handleSubmit, setValue } = useForm<TFormGroupProccesing>({})
  const { data } = useGetOptionsGroupOperationQuery(null)
  const [saveChanges] = useSaveOptionsGroupOperationMutation()

  const getFirstValueOrUndefined = (options?: any[]) => {
    const firstOption = options?.[0]

    if (!firstOption || firstOption.value === '') {
      return undefined
    }

    return firstOption.value
  }

  const appendIfSelected = (formData: FormData, key: string, options?: any[]) => {
    const value = getFirstValueOrUndefined(options)

    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value))
    }
  }

  const selectedCase = useWatch({ control, name: 'cases' }) as any

  const selectedCaseId =
    Array.isArray(selectedCase) && selectedCase[0]?.value ? selectedCase[0].value : undefined

  const filteredDeals = useMemo(() => {
    if (!data?.deals) return []
    if (!selectedCaseId) return []
    return data.deals.filter((deal: any) => {
      return deal.id_case === selectedCaseId
    })
  }, [data?.deals, selectedCaseId])

  useEffect(() => {
    setValue('deals', [] as any, { shouldDirty: true })
  }, [selectedCaseId, setValue])

  const selectedArticle = useWatch({ control, name: 'articles' }) as any

  const selectedArticleId =
    Array.isArray(selectedArticle) && selectedArticle[0]?.value
      ? selectedArticle[0].value
      : undefined

  const filteredSubarticles = useMemo(() => {
    if (!data?.subarticles) return []
    if (!selectedArticleId) return []

    return data.subarticles.filter((subarticle: any) => {
      return subarticle.id_parent === selectedArticleId
    })
  }, [data?.subarticles, selectedArticleId])

  useEffect(() => {
    setValue('subarticles', [] as any, { shouldDirty: true })
  }, [selectedArticleId, setValue])

  const onSubmit: SubmitHandler<TFormGroupProccesing> = async (data) => {
    const formData = new FormData()

    appendIfSelected(formData, 'id_case', data.cases as any[])
    appendIfSelected(formData, 'id_deal', data.deals as any[])
    appendIfSelected(formData, 'id_article', data.articles as any[])
    appendIfSelected(formData, 'id_subarticle', data.subarticles as any[])

    formData.append('cards', elements?.join(',') ?? '')

    try {
      const response = await saveChanges(formData).unwrap()

      if (response?.status) {
        toast.success('Изменения успешно сохранены')
        removeMarks([])
      } else {
        toast.error('Не удалось сохранить изменения')
      }
    } catch {
      toast.error('Ошибка при сохранении изменений')
    }
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
            name='cases'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.cases ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить кейс'
                onChange={field.onChange}
                className={styles.select}
                dropdownPositionTop={true}
              />
            )}
          />

          <Controller
            name='deals'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredDeals}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить сделку'
                onChange={field.onChange}
                className={styles.select}
                dropdownPositionTop={true}
              />
            )}
          />

          <Controller
            name='articles'
            control={control}
            render={({ field }) => (
              <SelectC
                options={data?.articles ?? []}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить статью'
                onChange={field.onChange}
                className={styles.select}
                dropdownPositionTop={true}
              />
            )}
          />

          <Controller
            name='subarticles'
            control={control}
            render={({ field }) => (
              <SelectC
                options={filteredSubarticles}
                values={field.value ?? [{ value: field.value, label: field.value }]}
                label='Установить подстатью'
                onChange={field.onChange}
                className={styles.select}
                dropdownPositionTop={true}
              />
            )}
          />
        </div>
        <div className={styles.formContentBottom}>
          <Button type='submit' label='Сохранить изменения' mode='primary' />
          <Button type='button' label='Отменить' mode='secondary' onClick={() => removeMarks([])} />
        </div>
      </form>
    </div>
  )
}
