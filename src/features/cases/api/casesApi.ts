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
  }),
})

export const { useGetAllCasesQuery } = casesApi
