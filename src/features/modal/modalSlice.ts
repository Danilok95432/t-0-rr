import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isOpenModal: false,
	buttonId: '',
}

export const modalSlice = createSlice({
	name: '@modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			state.isOpenModal = true
			state.buttonId = action.payload
		},
		closeModal: (state) => {
			state.isOpenModal = false
			state.buttonId = ''
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export const modalsReducer = modalSlice.reducer
