import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ICasesData } from '../table/config/casesTypes'

export const casesApi = createApi({
  reducerPath: 'casesApi',
  tagTypes: ['Cases'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllCases: build.query<ICasesData[], void>({
      query: () => ({
        url: '/cases/list',
      }),
      transformResponse: (response: { cases: ICasesData[] }) => response.cases,
      providesTags: ['Cases'],
    }),
  }),
})

export const { useGetAllCasesQuery } = casesApi
