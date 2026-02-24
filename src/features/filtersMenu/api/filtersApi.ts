import { FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { FilterData } from '../types/type'

export const filtersApi = createApi({
  reducerPath: 'filtersApi',
  tagTypes: ['Filters'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllFilters: build.query<FilterData, void>({
      query: () => ({
        url: '/filters/get_data',
      }),
      providesTags: ['Filters'],
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
  }),
})

export const { useGetAllFiltersQuery, useSaveFiltersMutation } = filtersApi
