import type { FC } from 'react'
import classNames from 'classnames'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'

import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './orgMainData.module.scss'
import { IOrganization } from '@/features/organizations/table/config/organizationsTypes'
import { Controller, useForm } from 'react-hook-form'

interface OrgMainDataSectionProps {
  id: string
  organization: IOrganization
}

export const OrgMainDataSection: FC<OrgMainDataSectionProps> = ({ organization, id }) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const { control, handleSubmit, reset } = useForm()

  console.log(organization)

  return (
    <form className={styles.orgMainData}>
      <h3 className={styles.title}>Основные данные организации</h3>

      <div className={styles.inner}>
        <Controller
          name='shortName'
          control={control}
          render={({ field }) => (
            <Input
              id='shortName'
              label='Название организации'
              hasResetIcon
              disabled={!isEditingModeActive}
              onChange={field.onChange}
            />
          )}
        />

        <Input id='inn' label='ИНН' hasResetIcon disabled={!isEditingModeActive} />

        <Input id='ogrn' label='ОРГН / ОГРНИП' hasResetIcon disabled={!isEditingModeActive} />

        <TextArea
          id='fullName'
          label='Полное наименование организации'
          disabled={!isEditingModeActive}
        />

        <TextArea
          id='legalAddress'
          label='Юридический адрес организации'
          disabled={!isEditingModeActive}
        />

        <TextArea
          id='employeesComment'
          label='Комментарий сотрудника'
          disabled={!isEditingModeActive}
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
        <Button mode='primary' label='Сохранить изменения' onClick={handleDeactivateEditingMode} />
        <Button mode='secondary' label='Отменить' onClick={handleDeactivateEditingMode} />
      </div>
    </form>
  )
}
