import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { TFormNewAccount } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IContragentAccountsData } from '../table/config/contragentsTypes'
import { useCallback } from 'react'

export const useEditAccountForm = (id: string, account: IContragentAccountsData) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormNewAccount>({
    defaultValues: {
      account_name: account.account_name,
      contragent_bank: account.contragent_bank,
      contragent_bik: account.contragent_bik,
      contragent_rschet: account.contragent_rschet,
      contragent_korschet: account.contragent_korschet,
      account_type_name: account.account_type_name,
      comment: account.comment
    },
    mode: 'onChange',
  })

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<TFormNewAccount> = async (data) => {
    console.log(data, id)
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
