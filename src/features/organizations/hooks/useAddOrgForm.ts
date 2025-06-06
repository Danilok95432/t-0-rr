import { useModal } from '@/features/modal/hooks/useModal'
import { useAddNewOrgQuery, useEditOrgMutation } from '../api/organizationsApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TFormOrganization } from '@/shared/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrgSchema } from '../table/config/orgSchema'

export const useAddOrgForm = () => {
  const { handleCloseModal } = useModal()
  const { refetch: getNewId } = useAddNewOrgQuery()
  const [saveNewOrg] = useEditOrgMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormOrganization>({
    defaultValues: {
      shortName: '',
      inn: '',
      fullName: '',
      ogrn: '',
      legalAddress: '',
      employeesComment: '',
    },
    resolver: zodResolver(OrgSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormOrganization> = async (data) => {
    const newIdResponse = await getNewId().unwrap()
    const formData = new FormData()
    formData.append('org_name', data.shortName || '')
    formData.append('org_inn', data.inn || '')
    formData.append('org_ogrn', data.ogrn || '')
    formData.append('org_name_full', data.fullName || '')
    formData.append('org_legal_address', data.legalAddress || '')
    formData.append('comment', data.employeesComment || '')
    if (newIdResponse)
      formData.append('id', newIdResponse.id)

    try {
      await saveNewOrg(formData)
      reset()
      handleCloseModal()
    } catch (error) {
      console.error('Ошибка добавления организации:', error)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting }
}
