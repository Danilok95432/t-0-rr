import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { type IFormProps } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { useAddOrgForm } from '../hooks/useAddOrgForm'

import styles from './new-organization.module.scss'

export const NewOrganization: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, errors, isValid, isSubmitting } = useAddOrgForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOrganization}>
      <div className={styles['main-info']}>
        <div className={styles.left}>
          <Controller
            name='shortName'
            control={control}
            render={({ field }) => (
              <Input
                id='shortName'
                label='Название организации'
                value={field.value}
                onChange={field.onChange}
                error={errors.shortName?.message}
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
                onChange={field.onChange}
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
                onChange={field.onChange}
                error={errors.legalAddress?.message}
              />
            )}
          />
        </div>
        <div className={styles.right}>
          <Controller
            name='inn'
            control={control}
            render={({ field }) => (
              <Input
                id='inn'
                label='ИНН'
                value={field.value}
                onChange={field.onChange}
                maxLength={20}
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
                onChange={field.onChange}
                maxLength={20}
                error={errors.ogrn?.message}
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
                onChange={field.onChange}
                className={styles.employee_textAria}
              />
            )}
          />
        </div>
      </div>

      <Button type='submit' label='Сохранить' mode='primary' disabled={!isValid || isSubmitting} />
    </form>
  )
}
