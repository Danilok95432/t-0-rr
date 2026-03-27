import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { DealInfo } from '../table/config/dealsType'
import { useSaveDealInfoMutation } from '../api/dealsApi'
import { formatDateToYYYYMMDD, getFirstValue } from '@/shared/helpers/helpers'

export const useEditDealForm = (id: string, deal: DealInfo) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

  // Подготавливаем правильные defaultValues
  const defaultValues = {
    deal_name: deal.deal_name || '',
    cases_list: deal.cases_list || [],
    dogovor_name: deal.dogovor_name === 'undefined' ? 'значение не задано' : deal.dogovor_name ?? '',
    deal_name_full: deal.deal_name_full || '',
    orgs_list: deal.orgs_list || [],
    contragents_list: deal.contragents_list || [],
    deal_date: deal.deal_date || '',
    deal_plan_rashod: deal.deal_plan_rashod || '',
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DealInfo>({
    defaultValues,
    mode: 'onChange',
  })

  const [saveNewDeal] = useSaveDealInfoMutation()

  // Функция для полного сброса формы
  const resetForm = useCallback(() => {
    reset(defaultValues)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, deal]) // Добавляем deal в зависимости

  const onSubmit: SubmitHandler<DealInfo> = async (data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append(
      'deal_date',
      data?.deal_date !== undefined && formatDateToYYYYMMDD(data?.deal_date) !== 'Invalid Date'
        ? formatDateToYYYYMMDD(data?.deal_date)
        : formatDateToYYYYMMDD(new Date()),
    )
    formData.append('deal_short_name', data?.deal_name || '')
    formData.append('deal_name_full', data?.deal_name_full || '')
    formData.append('id_org', getFirstValue(data.orgs_list) || '')
    formData.append('id_case', getFirstValue(data.cases_list) || '')
    formData.append('id_contragent', getFirstValue(data.contragents_list) || '')
    formData.append('dogovor_name', data?.dogovor_name || '')
    formData.append('deal_plan_rashod', data?.deal_plan_rashod || '')

    try {
      await saveNewDeal(formData)
      resetForm() // Используем resetForm вместо reset
      handleDeactivateEditingMode()
    } catch (error) {
      console.error('Ошибка добавления операции:', error)
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
    handleDeactivateEditingMode,
    handleCancel,
    reset: resetForm, // Возвращаем resetForm вместо reset
  }
}
