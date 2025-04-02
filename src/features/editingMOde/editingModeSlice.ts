import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isEditingModeActive: false,
}

export const editingModeSlice = createSlice({
	name: '@editingMode',
	initialState,
	reducers: {
		activeEditingMode: (state) => {
			state.isEditingModeActive = true
		},
		deactivateEditingMode: (state) => {
			state.isEditingModeActive = false
		},
	},
})

export const { activeEditingMode, deactivateEditingMode } = editingModeSlice.actions
export const editingModeReducer = editingModeSlice.reducer
