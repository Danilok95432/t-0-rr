import { MouseEvent, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { closeModal, openModal } from '@/features/modal/store/modalSlice'

export const useModal = () => {
  const dispatch = useAppDispatch()
  const { isOpenModal, buttonId } = useAppSelector((state) => state.modal)

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
    const idButton = event.currentTarget.getAttribute('id')
    dispatch(openModal(idButton ?? ''))
  }

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

  // Обработчик Esc
  useEffect(() => {
    if (isOpenModal) {
      const closeByEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCloseModal()
        }
      }

      document.addEventListener('keydown', closeByEscape)

      return () => document.removeEventListener('keydown', closeByEscape)
    }
  }, [isOpenModal, handleCloseModal])

  return { isOpenModal, buttonId, handleOpenModal, handleCloseModal }
}
