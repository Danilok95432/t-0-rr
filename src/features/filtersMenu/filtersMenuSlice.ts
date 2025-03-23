import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isOpenFiltersMenu: false,
}

export const filtersMenuSlice = createSlice({
	name: '@filterMenu',
	initialState,
	reducers: {
		openFiltersMenu: (state) => {
			state.isOpenFiltersMenu = true
		},
		closeFiltersMenu: (state) => {
			state.isOpenFiltersMenu = false
		},
	},
})

export const { openFiltersMenu, closeFiltersMenu } = filtersMenuSlice.actions
export const filtersMenuReducer = filtersMenuSlice.reducer
