import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import type { RootState } from '@/app/store/store'
import { AuthResponse } from '../types/auth'

import { login, logout } from '@/features/auth/store/authSlice'
import { BASE_URL } from '../lib/const'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) headers.set('Authorization', token)

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          { url: '/refresh', method: 'POST' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const authResponse = refreshResult.data as AuthResponse

          api.dispatch(login(authResponse))

          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())

          localStorage.removeItem('token')
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

