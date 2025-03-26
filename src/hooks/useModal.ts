import { MouseEvent, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeModal, openModal } from '@/features/modal/modalSlice'

export const useModal = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const dispatch = useAppDispatch()
	const { isOpenModal, buttonId } = useAppSelector((state) => state.modal)

	const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
		const idButton = event.currentTarget.getAttribute('id')
		dispatch(openModal(idButton))
	}

	const handleCloseModal = () => {
		dispatch(closeModal())
	}

	return { dialogRef, isOpenModal, buttonId, handleOpenModal, handleCloseModal }
}
