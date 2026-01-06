import { MouseEvent, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { closeModal, openModal } from '@/features/modal/store/modalSlice'

export const useModal = () => {
  const dispatch = useAppDispatch()
  const { isOpenModal, buttonId } = useAppSelector((state) => state.modal)

  // открыть модалку по id кнопки
  const openModalById = useCallback(
    (id: string) => {
      dispatch(openModal(id))
    },
    [dispatch]
  )

  // старый обработчик для кнопок
  const handleOpenModal = (event: MouseEvent<HTMLElement>) => {
    const idButton = event.currentTarget.getAttribute('id')
    openModalById(idButton ?? '')
  }

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal())
  }, [dispatch])

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

  return { isOpenModal, buttonId, handleOpenModal, openModalById, handleCloseModal }
}
