import { FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { FilterOperationData, FilterDealData } from '../types/type'

export const filtersApi = createApi({
  reducerPath: 'filtersApi',
  tagTypes: ['Filters'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllFilters: build.query<FilterOperationData & FilterDealData, void>({
      query: () => ({
        url: '/filters/get_data',
      }),
      providesTags: ['Filters'],
      //
    }),
    getAllFiltersDeal: build.query<FilterDealData, void>({
      query: () => ({
        url: '/filters/deals_get_data',
      }),
      providesTags: ['Filters'],
      //
    }),
    clearFilters: build.mutation<void, void>({
      query: () => ({
        url: '/filters/clear',
      }),
      invalidatesTags: ['Filters'],
      //
    }),
    clearFiltersDeal: build.mutation<void, void>({
      query: () => ({
        url: '/filters/deals_clear',
      }),
      invalidatesTags: ['Filters'],
      //
    }),
    saveFilters: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/filters/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Filters'],
    }),
    saveFiltersDeal: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/filters/deals_save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Filters'],
    }),
  }),
})

export const { useGetAllFiltersQuery, useClearFiltersDealMutation, useClearFiltersMutation, useSaveFiltersMutation, useGetAllFiltersDealQuery, useSaveFiltersDealMutation } = filtersApi
