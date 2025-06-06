import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'

import { useEditOrgForm } from '../hooks/useEditOrgForm'
import { IOrganizationData } from '@/features/organizations/table/config/organizationsTypes'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './editOrgForm.module.scss'

interface EditOrganizationFormProps {
  id: string
  organization: IOrganizationData
}

export const EditOrganizationForm: FC<EditOrganizationFormProps> = ({ id, organization }) => {
  const {
    isEditingModeActive,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    handleDeactivateEditingMode,
  } = useEditOrgForm(id, organization)

  return (
    <form className={styles.orgMainData} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Основные данные организации</h3>

      <div className={styles.inner}>
        <Controller
          name='shortName'
          control={control}
          render={({ field }) => (
            <Input
              id='shortName'
              label='Название организации'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.shortName?.message}
            />
          )}
        />

        <Controller
          name='inn'
          control={control}
          render={({ field }) => (
            <Input
              id='inn'
              label='ИНН'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.inn?.message}
            />
          )}
        />

        <Controller
          name='ogrn'
          control={control}
          render={({ field }) => (
            <Input
              id='ogrn'
              label='ОГРН / ОГРНИП'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.ogrn?.message}
            />
          )}
        />

        <Controller
          name='fullName'
          control={control}
          render={({ field }) => (
            <TextArea
              id='fullName'
              label='Полное наименование организации'
              value={field.value}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          name='legalAddress'
          control={control}
          render={({ field }) => (
            <TextArea
              id='legalAddress'
              label='Юридический адрес организации'
              value={field.value}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.legalAddress?.message}
            />
          )}
        />

        <Controller
          name='employeesComment'
          control={control}
          render={({ field }) => (
            <TextArea
              id='employeesComment'
              label='Комментарий сотрудника'
              value={field.value}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.employeesComment?.message}
            />
          )}
        />

        <div className={styles.balance}>
          <h3 className={styles.balance_title}>Баланс организации</h3>

          <div className={styles.balance_body}>
            <span>Приход за всё время</span>
            <span className={styles.coming}>{organization.coming} ₽</span>
            <span>Расход за всё время</span>
            <span className={styles.expenses}>{organization.expenses} ₽</span>
            <span>Разница за всё время</span>
            <span className={styles.difference}>{organization.difference} ₽</span>
          </div>
        </div>
      </div>

      <div
        className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
      >
        <Button
          type='submit'
          mode='primary'
          label='Сохранить изменения'
          onClick={handleDeactivateEditingMode}
          disabled={!isValid || isSubmitting}
        />
        <Button mode='secondary' label='Отменить' onClick={handleCancel} />
      </div>
    </form>
  )
}
