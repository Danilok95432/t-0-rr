import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFormEditCase } from '@/shared/types/forms'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { CaseSchema } from '@/features/cases/table/config/caseSchema'
import { useEditCaseMutation } from '@/features/cases/api/casesApi'

export const useEditCaseForm = (id: string, caseName: string) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormEditCase>({
    defaultValues: {
      caseName,
    },
    resolver: zodResolver(CaseSchema),
    mode: 'onChange',
  })
  const [editCase] = useEditCaseMutation()

  const resetForm = useCallback(() => {
    reset({ caseName: caseName })
  }, [caseName, reset])

  useEffect(() => {
    resetForm()
  }, [caseName, resetForm])

  const onSubmit: SubmitHandler<TFormEditCase> = async (data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('case_name', data.caseName)

    try {
      await editCase(formData).unwrap()
    } catch (error) {
      console.error('Ошибка обновления кейса:', error)
    }
  }

  const handleCancel = () => {
    handleDeactivateEditingMode()
    resetForm()
  }

  return {
    isEditingModeActive,
    control,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
    handleCancel,
    handleDeactivateEditingMode,
  }
}
