import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCaseMutation } from '../api/casesApi'
import { type TFormNewCase } from '@/shared/types/forms'
import { useModal } from '@/features/modal/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaseSchema } from '../table/config/caseSchema'

export const useNewCaseForm = () => {
  const { handleCloseModal } = useModal()
  const [addNewCase] = useAddNewCaseMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormNewCase>({
    defaultValues: {
      caseName: '',
    },
    resolver: zodResolver(CaseSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormNewCase> = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('title', data.caseName)

    try {
      await addNewCase(formData).unwrap()
      reset()
      handleCloseModal()
    } catch (error) {
      console.error(error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting }
}
