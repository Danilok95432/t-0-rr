import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import { useNewCaseForm } from '../hooks/useNewCaseForm'
import { type IFormProps } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './new-case.module.scss'

export const NewCase: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit } = useNewCaseForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewCase}>
      <div className={styles['main-info']}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input id='name' label='Название кейса' value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <Button type='submit' label='Сохранить' mode='primary' />
    </form>
  )
}
