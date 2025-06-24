import { TFormNewAccount } from '@/shared/types/forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewAccountQuery, useEditAccountMutation } from '../api/accountsApi'
import { useModal } from '@/features/modal/hooks/useModal'

export const useNewAccountForm = () => {
  const { handleCloseModal } = useModal()
  const { refetch: getNewId } = useAddNewAccountQuery()
  const [saveNewAccount] = useEditAccountMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormNewAccount>({
    defaultValues: {
      account_name: '',
      account_types: '',
      bank_name: '',
      comment: '',
      orgs: '',
      rschet: '',
      bik: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormNewAccount> = async (data) => {
    console.log(data)
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
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
    formData.append('rschet', data.rschet)
    formData.append('bik', data.bik)
    if (newIdResponse)
      formData.append('id', newIdResponse.id)
    try {
      await saveNewAccount(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.log('Ошибка обновления счета:', error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting }
}
