import { createSlice } from '@reduxjs/toolkit'

interface IQuickFilterState {
	value: string
}

const initialState: IQuickFilterState = {
	value: '',
}

const quickFilterSlice = createSlice({
	name: 'quickFilter',
	initialState,
	reducers: {
		setValue: (state, action) => {
			state.value = action.payload
		},
	},
})

export const { setValue } = quickFilterSlice.actions
export const quickFilterReducer = quickFilterSlice.reducer
