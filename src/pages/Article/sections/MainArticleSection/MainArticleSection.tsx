import classNames from 'classnames'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './mainArticle.module.scss'
import { TextArea } from '@/shared/ui/TextArea'
import { IArticleInfo } from '@/features/articles/table/config/articlesTypes'
import { FC } from 'react'
import { useEditArticleForm } from '@/features/articles/hooks/useEditArticleForm'
import { Controller } from 'react-hook-form'

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
  } = useEditArticleForm(id, article)

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
          <Controller
            name='direction'
            control={control}
            render={({ field }) => (
              <Input
                id='direction'
                label='Направление статьи'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.direction?.message}
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
          <Controller
            name='parent'
            control={control}
            render={({ field }) => {
              return (
                <Input
									id='parent'
									label='Родительская статья'
									value={field.value}
									hasResetIcon={false}
									disabled={!isEditingModeActive}
									onChange={field.onChange}
									error={errors.parent?.message}
								/>
              )
            }}
          />
          <Controller
            name='article_exp_name'
            control={control}
            render={({ field }) => (
              <Input
                id='article_exp_name'
                label='Тип расходов'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.article_exp_name?.message}
              />
            )}
          />
        </div>

        <div
          className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
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
