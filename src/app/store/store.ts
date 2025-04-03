import { configureStore } from '@reduxjs/toolkit'

import { filtersMenuReducer } from '@/features/filtersMenu/store/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/store/modalSlice'
import { editingModeReducer } from '@/features/editingMode/store/editingModeSlice'

export const store = configureStore({
	reducer: {
		filterMenu: filtersMenuReducer,
		modal: modalsReducer,
		editingMode: editingModeReducer,
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
