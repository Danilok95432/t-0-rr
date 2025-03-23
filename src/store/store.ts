import { configureStore } from '@reduxjs/toolkit'

import { filtersMenuReducer } from '@/features/filtersMenu/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/modalSlice'

export const store = configureStore({
	reducer: {
		filterMenu: filtersMenuReducer,
		modal: modalsReducer,
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
