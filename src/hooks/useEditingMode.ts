import { activeEditingMode, deactivateEditingMode } from '@/features/editingMOde/editingModeSlice'
import { useAppDispatch, useAppSelector } from './useRedux'

export const useEditingMode = () => {
	const dispatch = useAppDispatch()

	const { isEditingModeActive } = useAppSelector((state) => state.editingMode)

	const handleActiveEditingMode = () => {
		dispatch(activeEditingMode())
	}

	const handleDeactivateEditingMode = () => {
		dispatch(deactivateEditingMode())
	}

	return { isEditingModeActive, handleActiveEditingMode, handleDeactivateEditingMode }
}
