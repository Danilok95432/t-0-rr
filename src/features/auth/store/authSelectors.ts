import { RootState } from '@/app/store/store'

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
