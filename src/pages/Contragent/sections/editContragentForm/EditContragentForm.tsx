import { FC } from 'react'
import classNames from 'classnames'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { IContragentData } from '@/features/contragents/table/config/contragentsTypes'

import { Input } from '@/shared/ui/Input'
import { SelectC } from '@/shared/ui/Select'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './contragentForm.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TFormContragent } from '@/shared/types/forms'

interface EditContragentFormProps {
  id: string
  contragent: IContragentData
}

export const EditContragentForm: FC<EditContragentFormProps> = ({ id, contragent }) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormContragent>({
    defaultValues: {
      name: contragent.name,
      fullName: contragent.fullName,
      inn: contragent.inn,
      type: [contragent.type],
    },
    mode: 'onChange',
  })

  console.log(contragent.type)
  return (
    <form className={styles.mainDataContragent}>
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
            return (
              <SelectC
                values={field.value[0]}
                options={contragent.type}
                label='Тип контрагента'
                // onChange={field.onChange(selected[0]?.value)}
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
        <Button mode='primary' label='Сохранить изменения' onClick={handleDeactivateEditingMode} />
        <Button mode='secondary' label='Отменить' onClick={handleDeactivateEditingMode} />
      </div>
    </form>
  )
}
