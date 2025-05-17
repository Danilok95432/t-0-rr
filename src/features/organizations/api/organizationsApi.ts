import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { OrganizationsDTO } from '../table/config/organizationsTypes'

export const organizationsApi = createApi({
  reducerPath: 'organizationsApi',
  tagTypes: ['Organizations'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllOrganizations: build.query<OrganizationsDTO[], void>({
      query: () => ({
        url: '/orgs/list',
      }),
      transformResponse: (response: { orgs: OrganizationsDTO[] }) => response.orgs,
      providesTags: ['Organizations'],
    }),
  }),
})

export const { useGetAllOrganizationsQuery } = organizationsApi
