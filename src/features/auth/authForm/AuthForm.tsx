import { type FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { type IFormProps, type TFormAuth } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './auth.module.scss'

export const AuthForm: FC<IFormProps> = () => {
  const { control, handleSubmit, reset } = useForm<TFormAuth>({
    defaultValues: {
      user_name: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<TFormAuth> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>Авторизация</p>

      <Controller
        name='user_name'
        control={control}
        render={({ field }) => (
          <Input
            id='user_name'
            label='Имя пользователя'
            hasResetIcon
            value={field.value}
            onChange={(text) => field.onChange(text)}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <Input
            id='password'
            label='Пароль'
            hasResetIcon
            value={field.value}
            onChange={(text) => field.onChange(text)}
          />
        )}
      />

      <Button type='submit' label='Войти' mode='primary' className={styles.button} />
    </form>
  )
}
