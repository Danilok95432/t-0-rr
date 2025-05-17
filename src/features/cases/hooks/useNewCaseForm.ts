import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCaseMutation } from '../api/casesApi'
import { type TFormNewCase } from '@/shared/types/forms'
import { useModal } from '@/features/modal/hooks/useModal'

export const useNewCaseForm = () => {
  const { handleCloseModal } = useModal()
  const [addNewCase] = useAddNewCaseMutation()

  const { control, handleSubmit, reset } = useForm<TFormNewCase>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit: SubmitHandler<TFormNewCase> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.name)

    try {
      await addNewCase(formData).unwrap()
      reset()
      handleCloseModal()
    } catch (error) {
      console.error(error)
    }
  }

  return { control, handleSubmit, onSubmit }
}
