/* eslint-disable @typescript-eslint/no-explicit-any */ 
import classNames from 'classnames'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './mainArticle.module.scss'
import { TextArea } from '@/shared/ui/TextArea'
import { IArticleInfo } from '@/features/articles/table/config/articlesTypes'
import { FC, useEffect, useMemo, useState } from 'react'
import { useEditArticleForm } from '@/features/articles/hooks/useEditArticleForm'
import { Controller, useWatch } from 'react-hook-form'
import { SelectC } from '@/shared/ui/Select'
import { TSelectOption } from '@/shared/ui/Select/types'

interface MainArticleSectionProps {
  id: string
  article: IArticleInfo
}

export const MainArticleSection: FC<MainArticleSectionProps> = ({ id, article }) => {
  const {
    isEditingModeActive,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    handleDeactivateEditingMode,
    setValue,
    reset,
  } = useEditArticleForm(id, article)

  // списки опций из бэка
  const parentOptions = useMemo(
    () => article?.parents_list ?? [],
    [article?.parents_list]
  )

  const directionOptions = useMemo(
    () => article?.directions_list ?? [],
    [article?.directions_list]
  )

  const articleExpOptions = useMemo(
    () => article?.article_exps_list ?? [],
    [article?.article_exps_list]
  )

  // ВАЖНО: в форме для этих полей лежит массив опций, а не строка
  const parentSelected = useWatch({ control, name: 'parents_list' }) as TSelectOption[] | undefined
  const directionSelected = useWatch({
    control,
    name: 'directions_list',
  }) as TSelectOption[] | undefined
  const expSelected = useWatch({
    control,
    name: 'article_exps_list',
  }) as TSelectOption[] | undefined

  // Удобно вытащить именно value (id) первой выбранной опции
  const parentValue = parentSelected?.[0]?.value
  const directionValue = directionSelected?.[0]?.value
  const expValue = expSelected?.[0]?.value

  // === Связь: при изменении parent → подставить direction + article_exp ===
  useEffect(() => {
    if (!parentValue) return

    const parentObj = (parentOptions as any[]).find((p) => p.value === parentValue)
    if (!parentObj) return

    // direction из родителя
    if (directionValue !== parentObj.direction) {
      const newDir = (directionOptions as any[]).find(
        (d) => d.value === parentObj.direction
      )
      if (newDir) {
        setValue('directions_list', [newDir] as any, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    }

    // article_exp из родителя
    if (expValue !== parentObj.article_exp) {
      const newExp = (articleExpOptions as any[]).find(
        (e) => e.value === parentObj.article_exp
      )
      if (newExp) {
        setValue('article_exps_list', [newExp] as any, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    }
  }, [
    parentValue,
    parentOptions,
    directionValue,
    expValue,
    setValue,
    directionOptions,
    articleExpOptions,
  ])

  // === Связь: при изменении типа расходов → подставить direction ===
  useEffect(() => {
    if (!expValue) return

    const expObj = (articleExpOptions as any[]).find((e) => e.value === expValue)
    if (!expObj) return

    if (directionValue !== expObj.direction) {
      const newDir = (directionOptions as any[]).find(
        (d) => d.value === expObj.direction
      )
      if (newDir) {
        setValue('directions_list', [newDir] as any, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    }
  }, [expValue, articleExpOptions, directionValue, directionOptions, setValue])

  // фильтрация родителей по выбранному направлению и типу расходов
  const filteredParentOptions = useMemo(() => {
    return (parentOptions as any[]).filter((opt) => {
      if (directionValue && opt.direction !== directionValue) return false
      if (expValue && opt.article_exp !== expValue) return false
      return true
    })
  }, [parentOptions, directionValue, expValue])

  // фильтрация типов расходов по направлению
  const filteredArticleExpOptions = useMemo(() => {
    if (!directionValue) return articleExpOptions
    return (articleExpOptions as any[]).filter(
      (opt) => opt.direction === directionValue
    )
  }, [articleExpOptions, directionValue])

  const [, setIsInitialized] = useState(false)

  // Инициализация формы: берём первые элементы из списков как выбранные
  useEffect(() => {
    if (!article) return

    const parentOpts = article.parents_list ?? []
    const dirOpts = article.directions_list ?? []
    const expOpts = article.article_exps_list ?? []

    const parentOption = parentOpts[0]
    const directionOption = dirOpts[0]
    const expOption = expOpts[0]

    reset({
      article_name: (article as any).article_name ?? '',
      comment: (article as any).comment ?? '',
      parents_list: parentOption ? [parentOption] : [],
      directions_list: directionOption ? [directionOption] : [],
      article_exps_list: expOption ? [expOption] : [],
    } as any)

    setIsInitialized(true)
  }, [article, reset])

  return (
    <section className={styles.mainArticle}>
      <h3 className={styles.title}>Данные статьи</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inner}>
          <Controller
            name='article_name'
            control={control}
            render={({ field }) => (
              <Input
                id='article_name'
                label='Название статьи'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.article_name?.message}
              />
            )}
          />

          {/* Направление статьи */}
          <Controller
            name='directions_list'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? []}
                options={directionOptions}
                label='Направление статьи'
                disabled={!isEditingModeActive}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <TextArea
                id='comment'
                label='Комментарий'
                value={field.value}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.comment?.message}
                className={styles.articleTextArea}
              />
            )}
          />

          {/* Родительская статья */}
          <Controller
            name='parents_list'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? []}
                options={filteredParentOptions}
                disabled={!isEditingModeActive}
                label='Родительская статья'
                onChange={field.onChange}
              />
            )}
          />

          {/* Тип расходов */}
          <Controller
            name='article_exps_list'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ?? []}
                options={filteredArticleExpOptions}
                disabled={!isEditingModeActive}
                label='Тип расходов'
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div
          className={classNames(styles.button_wrapper, {
            [styles.isVisible]: isEditingModeActive,
          })}
        >
          <Button
            type='submit'
            mode='primary'
            label='Сохранить изменения'
            onClick={handleDeactivateEditingMode}
            disabled={!isValid || isSubmitting}
          />
          <Button mode='secondary' label='Отменить' onClick={handleCancel} />
        </div>
      </form>
    </section>
  )
}
