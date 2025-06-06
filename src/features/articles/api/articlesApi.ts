import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { FieldValues } from 'react-hook-form'
import { IArticleData, IArticleInfo } from '../table/config/articlesTypes'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['Articles'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllArticles: build.query<IArticleData, void>({
      query: () => ({
        url: '/articles/list',
      }),
      providesTags: ['Articles'],
    }),
    //
    getArticleInfo: build.query<IArticleInfo, string>({
      query: (id) => ({
        url: '/articles/view',
        params: {
          id,
        },
      }),
      providesTags: (_, __, id) => [{ type: 'Articles', id }],
    }),
    //
    addNewArticle: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/articles/getnew',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Articles'],
    }),
    //
    editArticle: build.mutation<string, FieldValues>({
      query: (formData) => ({
        url: '/articles/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
})

export const {
  useGetAllArticlesQuery,
  useGetArticleInfoQuery,
  useEditArticleMutation,
  useAddNewArticleMutation,
} = articlesApi
