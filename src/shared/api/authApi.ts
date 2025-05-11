import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import { type AuthResponse } from '../types/auth'
import { type FieldValues } from 'react-hook-form'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, FieldValues>({
      query: (formData) => ({
        url: '/auth',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    checkAuth: builder.query<AuthResponse, null>({
      query: () => ({
        url: '/refresh',
      }),
      providesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } = authApi
