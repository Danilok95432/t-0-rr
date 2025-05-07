import { RootState } from '@/app/store/store'
import { useAppSelector } from '@/app/store/hooks/useRedux'

import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth)
  return isAuth ? <Outlet /> : <Navigate to='/auth' replace />
}
