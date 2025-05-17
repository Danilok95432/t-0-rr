import { useState } from 'react'
import { useNavigate } from 'react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema } from '../authForm/authSchema'
import { useAppDispatch } from '@/app/store/hooks/useRedux'
import { TFormAuth } from '@/shared/types/forms'
import { useLoginMutation } from '@/shared/api/authApi'

export const useAuthForm = () => {
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
      dispatch(login(response))
      reset()
      navigate('/')
    } catch (error) {
      console.error('Ошибка авторизации:', error)
      setErrorStatus((error as { status?: number })?.status || null)
    }
  }

  return { control, handleSubmit, onSubmit, errors, isValid, isSubmitting, errorStatus, isLoading }
}
