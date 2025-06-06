import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCaseQuery, useEditCaseMutation } from '../api/casesApi'
import { type TFormNewCase } from '@/shared/types/forms'
import { useModal } from '@/features/modal/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaseSchema } from '../table/config/caseSchema'

export const useNewCaseForm = () => {
  const { handleCloseModal } = useModal()
  const { refetch: getNewId } = useAddNewCaseQuery()
  const [saveNewCase] = useEditCaseMutation()

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
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
    formData.append('case_name', data.caseName)
    if (newIdResponse)
      formData.append('id', newIdResponse.id)
    try {
      await saveNewCase(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления кейса:', error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting }
}
