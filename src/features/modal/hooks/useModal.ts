import { MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { closeModal, openModal } from '@/features/modal/store/modalSlice'

export const useModal = () => {
	const dispatch = useAppDispatch()
	const { isOpenModal, buttonId } = useAppSelector((state) => state.modal)

	const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
		const idButton = event.currentTarget.getAttribute('id')
		dispatch(openModal(idButton ?? ''))
	}

	const handleCloseModal = () => {
		dispatch(closeModal())
	}

	return { isOpenModal, buttonId, handleOpenModal, handleCloseModal }
}
