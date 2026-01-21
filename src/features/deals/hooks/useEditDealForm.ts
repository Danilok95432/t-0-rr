import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { DealInfo } from '../table/config/dealsType'
import { useSaveDealInfoMutation } from '../api/dealsApi'
import { formatDateToYYYYMMDD, getFirstValue } from '@/shared/helpers/helpers'

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

  const [saveNewDeal] = useSaveDealInfoMutation()

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<DealInfo> = async (data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('deal_date', formatDateToYYYYMMDD(data?.deal_date))
    formData.append('deal_short_name', data?.deal_name)
    formData.append('deal_name_full', data?.deal_name_full)
    formData.append(
      'id_org',
      data.orgs_list !== undefined ? data.org : getFirstValue(data.orgs_list)
    )
    formData.append(
      'id_case',
      data.cases_list !== undefined ? data.case : getFirstValue(data.cases_list)
    )
    formData.append(
      'id_contragent',
      data.contragents_list !== undefined ? data.contragent : getFirstValue(data.contragents_list)
    )
    formData.append('dogorov_name', data?.dogovor_name)
    formData.append('deal_plan_rashod', data?.deal_plan_rashod)

    try {
      await saveNewDeal(formData)
      reset()
    } catch (error) {
      console.error('Ошибка добавления операции:', error)
    }
    reset()
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
    reset,
  }
}
