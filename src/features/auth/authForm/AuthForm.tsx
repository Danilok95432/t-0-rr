import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import { useAuthForm } from '../hooks/useAuthForm'

import { type IFormProps } from '@/shared/types/forms'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './auth.module.scss'

export const AuthForm: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, errors, isValid, isSubmitting, errorStatus, isLoading } =
    useAuthForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <p>Авторизация</p>
      </div>

      {errorStatus === 401 && <span className={styles.error_auth}>Неверный логин или пароль</span>}
      <div className={styles.controllersRow}>
        <div className={styles.controllerEl}>
          <Controller
            name='user_name'
            control={control}
            render={({ field }) => (
              <Input
                id='user_name'
                label='Имя пользователя'
                hasResetIcon
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span className={styles.error_name}>{errors.user_name?.message}</span>
        </div>
        <div className={styles.controllerEl}>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                id='password'
                label='Пароль'
                type='password'
                hasResetIcon
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span className={styles.error_pass}>{errors.password?.message}</span>
        </div>
      </div>

      <Button
        type='submit'
        label={isLoading ? 'Загрузка' : 'Войти'}
        mode='primary'
        className={styles.button}
        disabled={!isValid || isSubmitting}
      />
    </form>
  )
}
