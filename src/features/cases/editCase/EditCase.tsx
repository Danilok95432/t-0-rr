import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'
import { useEditCaseForm } from '../hooks/useEditCaseForm'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './edit-case.module.scss'

interface ICaseFormProps {
  id: string
  caseName: string
}

export const CaseForm: FC<ICaseFormProps> = (props) => {
  const { id, caseName } = props
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
  } = useEditCaseForm(id, caseName)

  return (
    <form className={styles.mainDataCase} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Данные кейса</h3>

      <div className={styles.inner}>
        <Controller
          name='caseName'
          control={control}
          render={({ field }) => (
            <Input
              id='caseName'
              label='Название кейса'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
            />
          )}
        />

        <span className={styles.error}>{errors.caseName?.message}</span>
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
