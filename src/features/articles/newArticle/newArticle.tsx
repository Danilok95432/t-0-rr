/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './newArticle.module.scss'
import { useAddArticleForm } from '../hooks/useAddArticleForm'
import { useGetNewArticleListsQuery } from '../api/articlesApi'

export const NewArticle: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, setValue, isValid } = useAddArticleForm()
  const { data } = useGetNewArticleListsQuery()

  const parentOptions = useMemo(
    () => data?.parent_articles_list ?? [],
    [data?.parent_articles_list]
  )

  const directionOptions = useMemo(
    () => data?.directions ?? [],
    [data?.directions]
  )

  const articleExpOptions = useMemo(
    () => data?.article_exps ?? [],
    [data?.article_exps]
  )

  const parentValue = useWatch({ control, name: 'parent' }) as string | undefined
  const directionValue = useWatch({ control, name: 'direction' }) as string | undefined
  const expValue = useWatch({ control, name: 'article_exp_name' }) as string | undefined

  useEffect(() => {
    if (!parentValue) return
    const parentObj = parentOptions.find((p: any) => p.value === parentValue)
    if (!parentObj) return

    if (directionValue !== parentObj.direction) {
      setValue('direction', parentObj.direction, { shouldDirty: true, shouldValidate: true })
    }
    if (expValue !== parentObj.article_exp) {
      setValue('article_exp_name', parentObj.article_exp, { shouldDirty: true, shouldValidate: true })
    }
  }, [parentValue, parentOptions, directionValue, expValue, setValue])

  useEffect(() => {
    if (!expValue) return
    const expObj = articleExpOptions.find((e: any) => e.value === expValue)
    if (!expObj) return

    if (directionValue !== expObj.direction) {
      setValue('direction', expObj.direction, { shouldDirty: true, shouldValidate: true })
    }
  }, [expValue, articleExpOptions, directionValue, setValue])

  const filteredParentOptions = useMemo(() => {
    return (parentOptions as any[]).filter((opt) => {
      if (directionValue && opt.direction !== directionValue) return false
      if (expValue && opt.article_exp !== expValue) return false
      return true
    })
  }, [parentOptions, directionValue, expValue])

  const filteredArticleExpOptions = useMemo(() => {
    if (!directionValue) return articleExpOptions
    return (articleExpOptions as any[]).filter((opt) => opt.direction === directionValue)
  }, [articleExpOptions, directionValue])

  const getByValue = (options: any[], value?: string) =>
    options.find((o) => o.value === value) ?? null

  const extractValue = (newValue: any): string => {
    if (Array.isArray(newValue)) {
      const first = newValue[0]
      if (!first) return ''
      return first.value ?? ''
    }
    if (typeof newValue === 'string') return newValue
    if (newValue && typeof newValue === 'object' && 'value' in newValue) {
      return (newValue as any).value ?? ''
    }
    return ''
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.newArticle}>
      <div className={styles['main-info']}>
        <div className={styles.left}>
          <Controller
            name='article_name'
            control={control}
            render={({ field }) => (
              <Input
                id='article_name'
                label='Название статьи'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />

          <Controller
            name='parent'
            control={control}
            render={({ field }) => {
              const selected = getByValue(parentOptions, field.value)

              return (
                <SelectC
                  // SelectC ждёт массив объектов-опций
                  values={selected ? [selected] : []}
                  options={filteredParentOptions}
                  label='Родительская статья'
                  onChange={(newValue: any) => {
                    const value = extractValue(newValue)
                    field.onChange(value)
                  }}
                />
              )
            }}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <TextArea
                id='comment'
                label='Комментарий'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='direction'
            control={control}
            render={({ field }) => {
              const selected = getByValue(directionOptions, field.value)

              return (
                <SelectC
                  values={selected ? [selected] : []}
                  options={directionOptions}
                  label='Направление статьи'
                  onChange={(newValue: any) => {
                    const value = extractValue(newValue)
                    field.onChange(value)
                  }}
                />
              )
            }}
          />

          <Controller
            name='article_exp_name'
            control={control}
            render={({ field }) => {
              const selected = getByValue(articleExpOptions, field.value)

              return (
                <SelectC
                  values={selected ? [selected] : []}
                  options={filteredArticleExpOptions}
                  label='Тип расходов'
                  onChange={(newValue: any) => {
                    const value = extractValue(newValue)
                    field.onChange(value)
                  }}
                />
              )
            }}
          />
        </div>
      </div>

      <Button type='submit' label='Сохранить' mode='primary' disabled={!isValid} />
    </form>
  )
}
