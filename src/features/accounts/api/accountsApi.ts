import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { FieldValues } from 'react-hook-form'
import { IAccountInfo, IAccountsResponse } from '../table/config/accountsTypes'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  tagTypes: ['Accounts'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllAccounts: build.query<IAccountsResponse, void>({
      query: () => ({
        url: '/accounts/list',
      }),
      providesTags: ['Accounts'],
    }),
    //
    getAccountInfo: build.query<IAccountInfo, string>({
      query: (id) => ({
        url: '/accounts/view',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Accounts', id }],
    }),
    //
    addNewAccount: build.query<{status: string, id: string}, void>({
      query: () => ({
        url: '/cases/getnew',
        method: 'GET',
      }),
      providesTags: ['Accounts'],
    }),
    //
    editAccount: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/accounts/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Accounts'],
    }),
  }),
})

export const {
  useGetAllAccountsQuery,
  useGetAccountInfoQuery,
  useEditAccountMutation,
  useAddNewAccountQuery,
} = accountsApi
