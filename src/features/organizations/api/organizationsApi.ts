import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const organizationsApi = createApi({
  reducerPath: 'organizationsApi',
  tagTypes: ['Organizations'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllOrganizations: build.query<[], void>({
      query: () => ({
        url: '/orgs/list',
      }),
      providesTags: ['Organizations'],
    }),
  }),
})

export const { useGetAllOrganizationsQuery } = organizationsApi
