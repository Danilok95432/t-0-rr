import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { OrganizationDTO, OrganizationsDTO } from '../table/config/organizationsTypes'

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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Organizations' as const, id })),
              { type: 'Organizations' as const },
            ]
          : [{ type: 'Organizations' as const }],
    }),
    //
    getOrganizationInfo: build.query<OrganizationDTO, string>({
      query: (id) => ({
        url: '/orgs/view',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Organizations', id }],
    }),
  }),
})

export const { useGetAllOrganizationsQuery, useGetOrganizationInfoQuery } = organizationsApi
