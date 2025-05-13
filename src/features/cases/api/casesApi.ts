import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { CasesData } from '../table/config/casesTypes'

export const casesApi = createApi({
  reducerPath: 'casesApi',
  tagTypes: ['Cases'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllCases: build.query<CasesData[], void>({
      query: () => ({
        url: '/cases/list',
      }),
      transformResponse: (response: { cases: CasesData[] }) => response.cases,
      providesTags: ['Cases'],
    }),
  }),
})

export const { useGetAllCasesQuery } = casesApi
