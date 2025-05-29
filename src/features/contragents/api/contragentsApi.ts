import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { ContragentDTO, ContragentsDTO } from '../table/config/contragentsTypes'

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
  }),
})

export const { useGetAllContragentsQuery, useGetContragentInfoQuery } = contragentsApi
