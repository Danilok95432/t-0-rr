import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import {
  IImportLoadedFileInfo,
  IImportsData,
  IImportsOperation,
} from '../table/configs/importsTypes'
import { FieldValues } from 'react-hook-form'

export const importsApi = createApi({
  reducerPath: 'importsApi',
  tagTypes: ['Imports'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllImports: build.query<IImportsData[], { searchtext: string; step: number; limit: number }>(
      {
        query: ({ searchtext, step, limit }) => ({
          url: '/imports/list',
          params: {
            searchtext,
            step,
            limit,
          },
        }),
        transformResponse: (response: { imports: IImportsData[] }) => response.imports,
        providesTags: ['Imports'],
      },
    ),
    getImportOperations: build.query<IImportsOperation[], string>({
      query: (id) => ({
        url: '/imports/operations',
        params: {
          id_import: id,
        },
      }),
      transformResponse: (response: { operations: IImportsOperation[] }) => response.operations,
      providesTags: (_, __, id) => [{ type: 'Imports', id }],
    }),
    addNewImportOperation: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/imports/getnew',
        method: 'GET',
      }),
      providesTags: ['Imports'],
    }),
    //
    getImportOperationsCSV: build.query<Blob, string>({
      query: (id) => ({
        url: `imports/operations_csv`,
        params: {
          id_import: id,
        },
        responseHandler: async (response) => await response.blob(),
      }),
      providesTags: ['Imports'],
    }),
    importOperations: build.mutation<IImportLoadedFileInfo, FieldValues>({
      query: (formData) => ({
        url: `imports/import_start`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Imports'],
    }),
    deleteImportOperations: build.mutation<null, string>({
      query: (id) => ({
        url: `imports/import_delete`,
        method: 'DELETE',
        body: {
          id_import: id,
        },
        
      }),
      invalidatesTags: ['Imports'],
    }),
  }),
})

export const {
  useGetAllImportsQuery,
  useGetImportOperationsQuery,
  useAddNewImportOperationQuery,
  useLazyGetImportOperationsCSVQuery,
  useImportOperationsMutation,
  useDeleteImportOperationsMutation,
} = importsApi
