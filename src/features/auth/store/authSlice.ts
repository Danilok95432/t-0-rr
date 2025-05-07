import { type AuthResponse } from '@/shared/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState extends AuthResponse {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.accessToken
      state.isAuth = true
      state.user = action.payload.user
    },

    logout: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

