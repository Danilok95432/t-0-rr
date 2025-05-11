import { type AuthResponse } from '@/shared/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState extends AuthResponse {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token
      state.isAuth = true
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token ?? '')
      localStorage.setItem('user', JSON.stringify(action.payload.user ?? null))
    },

    logout: (state) => {
      state.isAuth = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    restoreAuth: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token
      state.isAuth = true
      state.user = action.payload.user
    },
  },
})

export const { login, logout, restoreAuth } = authSlice.actions
export const authReducer = authSlice.reducer
