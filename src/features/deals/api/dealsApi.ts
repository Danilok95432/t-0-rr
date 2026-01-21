import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { DealInfo, DealsDTO } from '../table/config/dealsType'
import { FieldValues } from 'react-hook-form';

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
    addNewDeal: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/deals/getnew',
        method: 'GET',
      }),
      providesTags: ['Deals'],
    }),
    //
    saveDealInfo: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/deals/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Deals'],
    }),
  }),
})

export const { useGetAllDealsQuery, useGetDealInfoQuery, useAddNewDealQuery, useSaveDealInfoMutation } = dealsApi
