import { useState, type FC } from 'react'
import { useNavigate } from 'react-router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema } from './authSchema'

import { type IFormProps, type TFormAuth } from '@/shared/types/forms'
import { useLoginMutation } from '@/shared/api/authApi'
import { useAppDispatch } from '@/app/store/hooks/useRedux'
import { login } from '../store/authSlice'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './auth.module.scss'

export const AuthForm: FC<IFormProps> = () => {
  const [loginMutation, { isLoading }] = useLoginMutation()
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormAuth>({
    defaultValues: {
      user_name: '',
      password: '',
    },
    resolver: zodResolver(AuthSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<TFormAuth> = async (data) => {
    const formData = new FormData()
    formData.append('user_name', data.user_name)
    formData.append('password', data.password)

    try {
      const response = await loginMutation(formData).unwrap()
      console.log('Успешная авторизация:', response)
      dispatch(login(response))
      reset()
      navigate('/')
    } catch (error) {
      console.log('Ошибка авторизации:', error)
      setErrorStatus((error as { status?: number })?.status || null)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <p>Авторизация</p>
      </div>

      {errorStatus === 401 && <span className={styles.error_auth}>Неверный логин или пароль</span>}

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
      <span className={styles.error_name}>{errors.user_name?.message}</span>

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
            onChange={(text) => field.onChange(text)}
          />
        )}
      />
      <span className={styles.error_pass}>{errors.password?.message}</span>

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
