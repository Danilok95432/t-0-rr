import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { FieldValues } from 'react-hook-form';
import { IStandartData, IStandartInfo } from '../table/configs/standartsTypes';

export const standartsApi = createApi({
  reducerPath: 'standartsApi',
  tagTypes: ['Standarts'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllStandarts: build.query<IStandartData[], { searchtext: string, step: number, limit: number }>({
      query: ({ searchtext, step, limit }) => ({
        url: '/imports/etalons_list',
        params: {
          searchtext,
          step,
          limit,
        }
      }),
      transformResponse: (response: { etalons: IStandartData[] }) => response.etalons,
      providesTags: ['Standarts'],
    }),
    getStandartInfo: build.query<IStandartInfo[], string>({
      query: (id) => ({
        url: '/imports/etalon_list',
        params: {
          id,
        },
      }),
      transformResponse: (response: { etalons: IStandartInfo[] }) => response.etalons,
      providesTags: (_, __, id) => [{ type: 'Standarts', id }],
    }),
    addNewStandart: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/standarts/getnew',
        method: 'GET',
      }),
      providesTags: ['Standarts'],
    }),
    //
    getStandartsCSV: build.query<Blob, string>({
      query: (id) => ({
        url: `imports/etalon_list_csv`,
        params: {
          id,
        },
        responseHandler: async (response) => await response.blob(),
      }),
      providesTags: ['Standarts'],
    }),
    importStandart: build.mutation<{status: string}, FieldValues>({
			query: (formData) => ({
				url: `standarts/import_start`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Standarts'],
		}),
  }),
})

export const {
  useGetAllStandartsQuery,
  useGetStandartInfoQuery,
  useAddNewStandartQuery,
  useLazyGetStandartsCSVQuery,
  useImportStandartMutation,
} = standartsApi
