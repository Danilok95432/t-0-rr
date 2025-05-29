import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { TFormOrganization } from '@/shared/types/forms'
import { OrgSchema } from '../table/config/orgSchema'
import { IOrganizationData } from '../table/config/organizationsTypes'
import { useEditOrgMutation } from '../api/organizationsApi'

export const useEditOrgForm = (id: string, organization: IOrganizationData) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormOrganization>({
    defaultValues: {
      shortName: organization.shortName,
      fullName: organization.fullName,
      inn: organization.inn,
      ogrn: organization.ogrn,
      legalAddress: organization.legalAddress,
      employeesComment: organization.employeesComment,
    },
    resolver: zodResolver(OrgSchema),
    mode: 'onChange',
  })
  const [editOrg] = useEditOrgMutation()

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<TFormOrganization> = async (data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('org_name', data.shortName ?? '')
    formData.append('org_inn', data.inn ?? '')
    formData.append('org_ogrn', data.ogrn ?? '')
    formData.append('org_name_full', data.fullName ?? '')
    formData.append('org_legal_address', data.legalAddress ?? '')
    formData.append('comment', data.employeesComment ?? '')

    try {
      await editOrg(formData).unwrap()
    } catch (error) {
      console.error('Ошибка обновления организации:', error)
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
  }
}
