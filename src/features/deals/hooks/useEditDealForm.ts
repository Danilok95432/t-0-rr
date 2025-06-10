import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { DealInfo } from '../table/config/dealsType'

export const useEditDealForm = (id: string, deal: DealInfo) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DealInfo>({
    defaultValues: {
      deal_name: deal.deal_name,
      case: deal.case,
      dogovor_name: deal.dogovor_name,
      deal_name_full: deal.deal_name_full,
      org: deal.org,
      contragent: deal.contragent,
      deal_date: deal.deal_date,
      deal_plan_rashod: deal.deal_plan_rashod,
    },
    mode: 'onChange',
  })

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<DealInfo> = async (data) => {
    console.log(data, id)
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
    handleDeactivateEditingMode,
    handleCancel,
  }
}
