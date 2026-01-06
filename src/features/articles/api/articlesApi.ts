import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/shared/api/baseQuery'
import { FieldValues } from 'react-hook-form'
import { IArticleData, IArticleInfo } from '../table/config/articlesTypes'
import {
  TSelectOption,
  TSelectOptionDirection,
  TSelectOptionParent,
} from '@/shared/ui/Select/types'

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
    addNewArticle: build.query<{ status: string; id: string }, void>({
      query: () => ({
        url: '/articles/getnew',
        method: 'GET',
      }),
      providesTags: ['Articles'],
    }),
    getNewArticleLists: build.query<
      {
        directions: TSelectOption[]
        article_exps: TSelectOptionDirection[]
        parent_articles_list: TSelectOptionParent[]
      },
      void
    >({
      query: () => ({
        url: '/articles/getnew_lists',
        method: 'GET',
      }),
      providesTags: ['Articles'],
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
  useAddNewArticleQuery,
  useGetNewArticleListsQuery,
} = articlesApi
