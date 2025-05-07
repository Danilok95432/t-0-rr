import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/features/auth/store/authSlice'
import { filtersMenuReducer } from '@/features/filtersMenu/store/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/store/modalSlice'
import { editingModeReducer } from '@/features/editingMode/store/editingModeSlice'
import { quickFilterReducer } from '@/features/quickFilter/store/quickFilterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filterMenu: filtersMenuReducer,
    modal: modalsReducer,
    editingMode: editingModeReducer,
    quickFilter: quickFilterReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
