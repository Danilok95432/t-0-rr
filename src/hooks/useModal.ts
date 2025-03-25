import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeModal, openModal } from '@/features/modal/modalSlice'

export const useModal = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const dispatch = useAppDispatch()
	const { isOpenModal } = useAppSelector((state) => state.modal)

	const handleOpenModal = () => {
		dispatch(openModal())
	}

	const handleCloseModal = () => {
		dispatch(closeModal())
	}

	return { dialogRef, isOpenModal, handleOpenModal, handleCloseModal }
}
