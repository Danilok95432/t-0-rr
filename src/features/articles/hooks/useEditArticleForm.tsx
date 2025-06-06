import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { TFormNewArticle } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { IArticleInfo } from '../table/config/articlesTypes'
import { useEditArticleMutation } from '../api/articlesApi'

export const useEditArticleForm = (id: string, article: IArticleInfo) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormNewArticle>({
    defaultValues: {
      article_name: article.article_name,
      direction: article.direction,
      article_exp_name: article.article_exp_name,
      comment: article.comment,
      parent: article.parent.article_name
    },
    mode: 'onChange',
  })

  const [editContragent] = useEditArticleMutation()

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<TFormNewArticle> = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('id', id)
    formData.append('article_name', data.article_name)
    formData.append('direction', data.direction)
    formData.append('article_exp_name', data.article_exp_name)
    formData.append('parent', data.parent)
    try {
      await editContragent(formData).unwrap()
    } catch (error) {
      console.log('Ошибка обновления статьи:', error)
    }
  }

  const handleCancel = () => {
    handleDeactivateEditingMode()
    resetForm()
  }

  return {
    isEditingModeActive,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    handleDeactivateEditingMode,
  }
}
