import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { DealInfo, DealPlan, DealsDTO } from '../table/config/dealsType'
import { FieldValues } from 'react-hook-form';

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  tagTypes: ['Deals'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllDeals: build.query<DealsDTO[], { step: number, limit?: number }>({
      query: ({ step, limit }) => ({
        url: '/deals/list',
        params: {
          step,
          limit,
        }
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
    deleteDeal: build.mutation<null, string>({
      query: (id) => ({
        url: `deals/delete`,
        method: 'DELETE',
        body: {
          id_deal: id,
        },
        
      }),
      invalidatesTags: ['Deals'],
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
    getDealPlan: build.query<DealPlan, string>({
      query: (id) => ({
        url: '/deals_plan/list',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Deals', id }],
    }),
    addNewDealPlan: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/deals_plan/getnew',
        method: 'GET',
      }),
      providesTags: ['Deals'],
    }),
    deleteDealPlan: build.mutation<null, string>({
      query: (id) => ({
        url: `deals_plan/delete`,
        method: 'DELETE',
        body: {
          id_deal_plan: id,
        },
        
      }),
      invalidatesTags: ['Deals'],
    }),
    //
    saveDealPlan: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/deals_plan/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Deals'],
    }),
  }),
})

export const { useGetAllDealsQuery, useAddNewDealPlanQuery, useDeleteDealPlanMutation, useGetDealPlanQuery, useSaveDealPlanMutation, useDeleteDealMutation, useGetDealInfoQuery, useAddNewDealQuery, useSaveDealInfoMutation } = dealsApi
