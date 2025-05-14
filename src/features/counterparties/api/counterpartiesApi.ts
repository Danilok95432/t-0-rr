import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { CounterpartiesDTO } from '../table/config/counterpartiesTypes'

export const counterpartiesApi = createApi({
  reducerPath: 'counterpartiesApi',
  tagTypes: ['Counterparties'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllCounterparties: build.query<CounterpartiesDTO[], void>({
      query: () => ({
        url: '/contragents/list',
      }),
      transformResponse: (response: { contragents: CounterpartiesDTO[] }) => response.contragents,
      providesTags: ['Counterparties'],
    }),
  }),
})

export const { useGetAllCounterpartiesQuery } = counterpartiesApi
