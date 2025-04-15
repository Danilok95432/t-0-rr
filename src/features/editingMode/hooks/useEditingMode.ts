import { useEffect, useCallback } from 'react'
import {
  activeEditingMode,
  deactivateEditingMode,
} from '@/features/editingMode/store/editingModeSlice'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'

export const useEditingMode = () => {
  const dispatch = useAppDispatch()

  const { isEditingModeActive } = useAppSelector((state) => state.editingMode)

  const handleActiveEditingMode = () => {
    dispatch(activeEditingMode())
  }

  const handleDeactivateEditingMode = useCallback(() => {
    dispatch(deactivateEditingMode())
  }, [dispatch])

  useEffect(() => {
    return () => {
      if (isEditingModeActive) {
        handleDeactivateEditingMode()
      }
    }
  }, [isEditingModeActive, handleDeactivateEditingMode])

  return { isEditingModeActive, handleActiveEditingMode, handleDeactivateEditingMode }
}
