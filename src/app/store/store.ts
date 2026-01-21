import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/features/auth/store/authSlice'
import { filtersMenuReducer } from '@/features/filtersMenu/store/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/store/modalSlice'
import { editingModeReducer } from '@/features/editingMode/store/editingModeSlice'
import { quickFilterReducer } from '@/features/quickFilter/store/quickFilterSlice'
import { authApi } from '@/shared/api/authApi'
import { casesApi } from '@/features/cases/api/casesApi'
import { dealsApi } from '@/features/deals/api/dealsApi'
import { organizationsApi } from '@/features/organizations/api/organizationsApi'
import { contragentsApi } from '@/features/contragents/api/contragentsApi'
import { articlesApi } from '@/features/articles/api/articlesApi'
import { accountsApi } from '@/features/accounts/api/accountsApi'
import { operationsApi } from '@/features/operations/api/operationsApi'
import { importsApi } from '@/features/imports/api/importsApi'
import { standartsApi } from '@/features/standarts/api/standartsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    filterMenu: filtersMenuReducer,
    modal: modalsReducer,
    editingMode: editingModeReducer,
    quickFilter: quickFilterReducer,
    [operationsApi.reducerPath]: operationsApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
    [contragentsApi.reducerPath]: contragentsApi.reducer,
    [casesApi.reducerPath]: casesApi.reducer,
    [dealsApi.reducerPath]: dealsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [importsApi.reducerPath]: importsApi.reducer,
    [standartsApi.reducerPath]: standartsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      casesApi.middleware,
      dealsApi.middleware,
      organizationsApi.middleware,
      contragentsApi.middleware,
      articlesApi.middleware,
      accountsApi.middleware,
      operationsApi.middleware,
      importsApi.middleware,
      standartsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
