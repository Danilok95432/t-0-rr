import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/features/auth/store/authSlice'
import { filtersMenuReducer } from '@/features/filtersMenu/store/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/store/modalSlice'
import { editingModeReducer } from '@/features/editingMode/store/editingModeSlice'
import { quickFilterReducer } from '@/features/quickFilter/store/quickFilterSlice'
import { authApi } from '@/shared/api/authApi'
import { casesApi } from '@/features/cases/api/casesApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    filterMenu: filtersMenuReducer,
    modal: modalsReducer,
    editingMode: editingModeReducer,
    quickFilter: quickFilterReducer,
    [casesApi.reducerPath]: casesApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, casesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
