import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/store/hooks/useRedux'
import { selectIsAuth } from '@/features/auth/store/authSelectors'

export const ProtectedRoute = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return isAuth ? <Outlet /> : <Navigate to='/auth' replace />
}
