import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { login, logout, restoreAuth } from '@/features/auth/store/authSlice'
import { useCheckAuthQuery } from '@/shared/api/authApi'
import { selectIsAuth } from '@/features/auth/store/authSelectors'

export const useAuthInit = () => {
  const dispatch = useAppDispatch()
  const [init, setInit] = useState(false)
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      dispatch(restoreAuth({ token, user: JSON.parse(user) }))
    }

    setInit(true)
  }, [dispatch])

  const { data, isSuccess, isError } = useCheckAuthQuery(null, { skip: !init || !isAuth })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(login(data))
    }

    if (isError) {
      dispatch(logout())
      setInit(false)
    }
  }, [isSuccess, isError, data, dispatch])

  return init
}
