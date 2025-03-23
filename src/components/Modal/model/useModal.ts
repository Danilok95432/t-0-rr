import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeModal } from '@/features/modal/modalSlice'

export const useModal = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const dispatch = useAppDispatch()
	const { isOpenModal } = useAppSelector((state) => state.modal)

	const handleClose = () => {
		dispatch(closeModal())
	}

	return { dialogRef, isOpenModal, handleClose }
}
