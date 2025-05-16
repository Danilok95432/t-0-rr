import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './mainDataCase.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TFormEditCase } from '@/shared/types/forms'
import { useEditCaseMutation } from '@/features/cases/api/casesApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditCaseSchema } from '@/features/cases/editCase/editCaseShema'

interface MainDataCaseProps {
  id: string
  case: string
}

export const MainDataCase: FC<MainDataCaseProps> = (props) => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormEditCase>({
    defaultValues: {
      caseName: props.case,
    },
    resolver: zodResolver(EditCaseSchema),
    mode: 'onChange',
  })
  const [editCase] = useEditCaseMutation()

  console.log(errors)

  const resetForm = useCallback(() => {
    reset({ caseName: props.case })
  }, [props.case, reset])

  useEffect(() => {
    resetForm()
  }, [props.case, resetForm])

  const onSubmit: SubmitHandler<TFormEditCase> = async (data) => {
    const formData = new FormData()
    formData.append('id', props.id)
    formData.append('case_name', data.caseName)

    try {
      const response = await editCase(formData).unwrap()
      console.log(response)
    } catch (error) {
      console.log('Ошибка обновления кейса:', error)
    }
  }

  const handleCancel = () => {
    handleDeactivateEditingMode()
    resetForm()
  }

  console.log(errors)

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
