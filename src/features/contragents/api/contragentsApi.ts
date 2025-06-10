import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { ContragentDTO, ContragentsDTO } from '../table/config/contragentsTypes'
import { FieldValues } from 'react-hook-form'

export const contragentsApi = createApi({
  reducerPath: 'contragentsApi',
  tagTypes: ['Contragents'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllContragents: build.query<ContragentsDTO[], void>({
      query: () => ({
        url: '/contragents/list',
      }),
      transformResponse: (response: { contragents: ContragentsDTO[] }) => response.contragents,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contragents' as const, id })),
              { type: 'Contragents' as const },
            ]
          : [{ type: 'Contragents' as const }],
    }),
    //
    getContragentInfo: build.query<ContragentDTO, string>({
      query: (id) => ({
        url: '/contragents/view',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Contragents', id }],
    }),
    //
    addNewContragent: build.query<{status: string, id: string}, void>({
      query: () => ({
        url: '/contragents/getnew',
        method: 'GET',
      }),
      providesTags: ['Contragents'],
    }),
    //
    editContragent: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/contragents/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Contragents'],
    }),
  }),
})

export const {
  useGetAllContragentsQuery,
  useGetContragentInfoQuery,
  useEditContragentMutation,
  useAddNewContragentQuery,
} = contragentsApi
