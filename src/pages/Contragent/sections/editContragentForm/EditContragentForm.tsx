import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'
import { IContragentData } from '@/features/contragents/table/config/contragentsTypes'
import { useEditContragentForm } from '@/features/contragents/hooks/useEditContragentForm'

import { Input } from '@/shared/ui/Input'
import { SelectC } from '@/shared/ui/Select'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'
import { TSelectOption } from '@/shared/ui/Select/types'

import styles from './contragentForm.module.scss'

interface EditContragentFormProps {
  id: string
  contragent: IContragentData
}

export const EditContragentForm: FC<EditContragentFormProps> = ({ id, contragent }) => {
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
  } = useEditContragentForm(id, contragent)

  return (
    <form className={styles.mainDataContragent} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Основные данные контрагента</h3>

      <div className={styles.inner}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              id='name'
              label='Название контрагента'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.name?.message}
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
          name='type'
          control={control}
          render={({ field }) => {
            console.log(contragent.type)

            return (
              <SelectC
                values={field.value ? [field.value] : []}
                options={contragent.type}
                label='Тип контрагента'
                onChange={(selected: TSelectOption[]) => {
                  field.onChange(selected[0] || null)
                }}
                disabled={!isEditingModeActive}
              />
            )
          }}
        />

        <Controller
          name='fullName'
          control={control}
          render={({ field }) => (
            <TextArea
              id='fullName'
              label='Полное наименование контрагента'
              value={field.value}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.fullName?.message}
            />
          )}
        />
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
