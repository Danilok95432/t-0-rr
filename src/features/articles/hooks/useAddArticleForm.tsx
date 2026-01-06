import { TFormNewArticle } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewArticleQuery, useEditArticleMutation } from '../api/articlesApi'
import { useModal } from '@/features/modal/hooks/useModal'
import { getFirstValue } from '@/shared/helpers/helpers'

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
      article_name: '',
      direction: '',
      article_exp_name: '',
      comment: '',
      parent: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormNewArticle> = async (data) => {
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
    formData.append('article_name', data.article_name)
    formData.append('direction', data.direction)
    formData.append('article_exp_name', data.article_exp_name)
    formData.append('parent', data.parent)
    formData.append('id_parent', getFirstValue(data.directions_list))
    formData.append('id_article', getFirstValue(data.article_exps_list))
    formData.append('id_direction', getFirstValue(data.parents_list))
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
