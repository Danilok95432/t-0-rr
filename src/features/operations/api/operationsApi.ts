// features/operations/api/operationsApi.ts

import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { OperationsResponse, OperationsSummary } from '../table/config/operationsTypes'
import { FieldValues } from 'react-hook-form'
import { TFormGroupProccesing, TFormNewOperation } from '@/shared/types/forms'

export interface GetAllOperationsArgs {
  searchtext: string
  step?: number
  limit?: number
  dateFrom?: string
  dateTo?: string
  org?: string // Теперь строка вместо string[]
  account?: string
  contragent?: string
  directions?: string
  article?: string
  cases?: string
  deals?: string
  order_by?: 'id' | 'date' | 'org' | 'contragent' | 'itemname' | 'case' | 'article' | 'summ'
  order_dir?: 0 | 1
}

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  tagTypes: ['Operations'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllOperations: build.query<OperationsResponse, GetAllOperationsArgs>({
      query: ({
        searchtext,
        step,
        limit,
        dateFrom,
        dateTo,
        org,
        account,
        contragent,
        directions,
        article,
        cases,
        deals,
        order_by,
        order_dir,
      }) => ({
        url: '/cards/list',
        params: {
          searchtext,
          step,
          limit,
          dateFrom,
          dateTo,
          org,
          account,
          contragent,
          directions,
          article,
          cases,
          deals,
          order_by,
          order_dir,
        },
      }),
      providesTags: (result) =>
        result?.cards
          ? [
              ...result.cards.map(({ id }) => ({ type: 'Operations' as const, id })),
              { type: 'Operations' as const },
            ]
          : [{ type: 'Operations' as const }],
    }),
    deleteOperation: build.mutation<null, string>({
      query: (id) => ({
        url: `cards/delete`,
        method: 'DELETE',
        body: {
          id: id,
        },
      }),
      invalidatesTags: ['Operations'],
    }),
    getSummary: build.query<OperationsSummary, string>({
      query: (searchtext) => ({
        url: '/cards/summary',
        params: {
          searchtext,
        },
      }),
      providesTags: ['Operations'],
    }),
    addNewOperation: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/cards/getnew',
        method: 'GET',
      }),
      providesTags: ['Operations'],
    }),
    editOperation: build.query<TFormNewOperation, string>({
      query: (id) => ({
        url: '/cards/edit',
        method: 'GET',
        params: {
          id,
        },
      }),
      providesTags: ['Operations'],
    }),
    saveOperation: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/cards/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Operations'],
    }),
    getOptionsGroupOperation: build.query<TFormGroupProccesing, null>({
      query: () => ({
        url: '/cards_group/get_data',
        method: 'GET',
      }),
      providesTags: ['Operations'],
    }),
    saveOptionsGroupOperation: build.mutation<{ status: string; errortext: string }, FieldValues>({
      query: (formData) => ({
        url: '/cards_group/save_data',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Operations'],
    }),
  }),
})

export const {
  useGetAllOperationsQuery,
  useGetSummaryQuery,
  useAddNewOperationQuery,
  useSaveOperationMutation,
  useEditOperationQuery,
  useDeleteOperationMutation,
  useGetOptionsGroupOperationQuery,
  useSaveOptionsGroupOperationMutation,
} = operationsApi
