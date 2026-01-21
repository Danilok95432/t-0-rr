import { TFormNewArticle } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewArticleQuery, useEditArticleMutation } from '../api/articlesApi'
import { useModal } from '@/features/modal/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArticleSchema } from '../table/config/articleSchema'

export const useAddArticleForm = () => {
  const { handleCloseModal } = useModal()
  const { refetch: getNewId } = useAddNewArticleQuery()
  const [saveNewArticle] = useEditArticleMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<TFormNewArticle>({
    defaultValues: {
      direction: '',
      article_exp_name: '',
      comment: '',
      parent: '',
    },
    mode: 'onChange',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(ArticleSchema as any)
  })

  const onSubmit: SubmitHandler<TFormNewArticle> = async (data) => {
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
    formData.append('article_name', data.article_name)
    formData.append('parent', data.parent)
    formData.append('article_exp', data.article_exp_name)
    formData.append('direction', data.direction)
    formData.append('comment', data?.comment)
    if (newIdResponse) formData.append('id', newIdResponse.id)
    try {
      await saveNewArticle(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления статьи:', error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting, setValue }
}
