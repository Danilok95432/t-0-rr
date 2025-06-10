import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { DealInfo, DealsDTO } from '../table/config/dealsType'

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  tagTypes: ['Deals'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllDeals: build.query<DealsDTO[], void>({
      query: () => ({
        url: '/deals/list',
      }),
      transformResponse: (response: { deals: DealsDTO[] }) => response.deals,
      providesTags: ['Deals'],
    }),
    getDealInfo: build.query<DealInfo, string>({
      query: (id) => ({
        url: '/deals/view',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Deals', id }],
    }),
  }),
})

export const { useGetAllDealsQuery, useGetDealInfoQuery } = dealsApi
