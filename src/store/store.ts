import { configureStore } from '@reduxjs/toolkit'

import { filtersMenuReducer } from '@/features/filtersMenu/filtersMenuSlice'
import { modalsReducer } from '@/features/modal/modalSlice'
import { editingModeReducer } from '@/features/editingMOde/editingModeSlice'

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
