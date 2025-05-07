import { type FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { type IFormProps, type TFormNewCase } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './new-case.module.scss'

export const NewCase: FC<IFormProps> = () => {
  const { handleCloseModal } = useModal()

  const { control, handleSubmit, reset } = useForm<TFormNewCase>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit: SubmitHandler<TFormNewCase> = (data) => {
    console.log(data)
    reset()
    handleCloseModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewCase}>
      <div className={styles['main-info']}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              id='name'
              label='Название кейса'
              value={field.value}
              onChange={(text) => field.onChange(text)}
            />
          )}
        />
      </div>

      <Button type='submit' label='Сохранить' mode='primary' />
    </form>
  )
}
