import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { login, logout, restoreAuth } from '@/features/auth/store/authSlice'
import { useCheckAuthQuery } from '@/shared/api/authApi'
import { selectIsAuth } from '@/features/auth/store/authSelectors'

export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        dispatch(restoreAuth({ token, user: parsedUser }))
      } catch (error) {
        console.error('Ошибка чтения  данных пользователя:', error)
        dispatch(logout())
      }
    }

    setIsInitialized(true)
  }, [dispatch])

  const { data, isSuccess, isError } = useCheckAuthQuery(null, { skip: !isInitialized || !isAuth })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(login(data))
    }

    if (isError) {
      dispatch(logout())
    }
  }, [isSuccess, isError, data, dispatch])

  return isInitialized
}
