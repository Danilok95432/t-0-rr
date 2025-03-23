import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isOpenModal: false,
}

export const modalSlice = createSlice({
	name: '@modal',
	initialState,
	reducers: {
		openModal: (state) => {
			state.isOpenModal = true
		},
		closeModal: (state) => {
			state.isOpenModal = false
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export const modalsReducer = modalSlice.reducer
