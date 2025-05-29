import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import { useNewCaseForm } from '../hooks/useNewCaseForm'
import { type IFormProps } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './new-case.module.scss'

export const NewCase: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, errors, isValid, isSubmitting } = useNewCaseForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewCase}>
      <div className={styles['main-info']}>
        <Controller
          name='caseName'
          control={control}
          render={({ field }) => (
            <Input
              id='caseName'
              label='Название кейса'
              value={field.value}
              onChange={field.onChange}
              error={errors.caseName?.message}
            />
          )}
        />
      </div>

      <Button type='submit' label='Сохранить' mode='primary' disabled={!isValid || isSubmitting} />
    </form>
  )
}
