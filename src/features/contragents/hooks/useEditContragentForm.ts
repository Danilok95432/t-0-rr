import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { TFormContragent } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IContragentData } from '../table/config/contragentsTypes'
import { useEditContragentMutation } from '../api/contragentsApi'
import { useCallback } from 'react'

export const useEditContragentForm = (id: string, contragent: IContragentData) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormContragent>({
    defaultValues: {
      name: contragent.name,
      fullName: contragent.fullName,
      inn: contragent.inn,
      type: contragent.type.find((opt) => opt.value === '1') || null,
    },
    mode: 'onChange',
  })

  const [editContragent] = useEditContragentMutation()

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<TFormContragent> = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('id', id)
    formData.append('contragent_name', data.name)
    formData.append('contragent_name_full', data.fullName)
    formData.append('inn', data.inn)
    formData.append('contragent_type_name', JSON.stringify(data.type))

    try {
      await editContragent(formData).unwrap()
    } catch (error) {
      console.log('Ошибка обновления контрагента:', error)
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
