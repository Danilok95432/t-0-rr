import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { TFormNewAccount } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useEditAccountMutation } from '../api/accountsApi'
import { IAccountInfo } from '../table/config/accountsTypes'

export const useEditAccountForm = (id: string, account: IAccountInfo) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormNewAccount>({
    defaultValues: {
      account_name: account.account_name,
      account_types: account.account_types,
      bank_name: account.bank_name,
      comment: account.comment,
      orgs: account.orgs,
      rschet: account.rschet,
      bik: account.bik,
    },
    mode: 'onChange',
  })

  console.log(errors, isValid)

  const [editAccount] = useEditAccountMutation()

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<TFormNewAccount> = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('id', id)
    formData.append('account_name', data.account_name)
    formData.append(
      'id_account_type',
      typeof data.account_types === 'string'
        ? data.account_types
        : data?.account_types && data?.account_types?.length > 0
        ? data.account_types[0].value
        : data?.account_types?.value
    )
    formData.append(
      'id_org',
      typeof data.orgs === 'string'
        ? data.orgs
        : data?.orgs && data?.orgs?.length > 0
        ? data.orgs[0].value
        : data?.orgs?.value
    )
    formData.append('bank_name', data.bank_name)
    formData.append('comment', data.comment ?? '')
    formData.append('rschet', data.rschet)
    formData.append('bik', data.bik)
    try {
      await editAccount(formData).unwrap()
    } catch (error) {
      console.log('Ошибка обновления счета:', error)
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
