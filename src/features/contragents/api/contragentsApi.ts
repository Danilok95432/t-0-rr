import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { ContragentsDTO } from '../table/config/contragentsTypes'

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
      providesTags: ['Contragents'],
    }),
  }),
})

export const { useGetAllContragentsQuery } = contragentsApi
