import { openModal } from '@/features/modal/modalSlice'
import { useAppDispatch } from '@/hooks/useRedux'

export const useModal = () => {
	const dispatch = useAppDispatch()

	const handleOpenModal = () => {
		dispatch(openModal())
	}

	return { handleOpenModal }
}
