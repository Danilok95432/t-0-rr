import { useModal } from '@/features/modal/hooks/useModal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TFormContragent } from '@/shared/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddNewContragentQuery, useEditContragentMutation } from '../api/contragentsApi'
import { ContragentSchema } from '../table/config/contragentSchema'

export const useAddContragentForm = () => {
  const { handleCloseModal } = useModal()
  const { refetch: getNewId } = useAddNewContragentQuery()
  const [saveNewContragent] = useEditContragentMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormContragent>({
    defaultValues: {
      name: '',
      inn: '',
      fullName: '',
      type: [{label: '', value: ''}],
    },
    resolver: zodResolver(ContragentSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormContragent> = async (data) => {
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
    formData.append('contragent_name', data.name || '')
    formData.append('inn', data.inn || '')
    formData.append('contragent_name_full', data.fullName || '')
    formData.append(
      'contragent_type',
      typeof data.type === 'string'
        ? data.type
        : data?.type && data?.type?.length > 0
        ? data.type[0].value
        : ''
    )
    if (newIdResponse) formData.append('id', newIdResponse.id)

    try {
      await saveNewContragent(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления контрагента:', error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting }
}
