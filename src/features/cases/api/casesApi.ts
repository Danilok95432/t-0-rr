import { FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { CasesDTO } from '../table/config/casesTypes'

export const casesApi = createApi({
  reducerPath: 'casesApi',
  tagTypes: ['Cases'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllCases: build.query<CasesDTO[], void>({
      query: () => ({
        url: '/cases/list',
      }),
      transformResponse: (response: { cases: CasesDTO[] }) => response.cases,
      providesTags: ['Cases'],
    }),
    //
    getCaseInfo: build.query<string, string>({
      query: (id) => ({
        url: '/cases/view',
        params: {
          id,
        },
      }),
      transformResponse: (response: { case_name: string }) => response.case_name,
      providesTags: ['Cases'],
    }),
    //
    addNewCase: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/cases/getnew',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cases'],
    }),
    //
    editCase: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/cases/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cases'],
    }),
  }),
})

export const {
  useGetAllCasesQuery,
  useGetCaseInfoQuery,
  useAddNewCaseMutation,
  useEditCaseMutation,
} = casesApi
