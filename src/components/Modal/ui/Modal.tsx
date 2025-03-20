import { useRef } from 'react'

import styles from './modal.module.scss'
import { Icon } from '@/components/Icon'

export const Modal = () => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	// const openModal = () => {
	// 	dialogRef.current?.showModal() // Открываем модальное окно
	// }

	const closeModal = () => {
		dialogRef.current?.close() // Закрываем модальное окно
	}
	return (
		<>
			<dialog open className={styles.modal} ref={dialogRef}>
				Контент модалки
				<button type='button' onClick={closeModal} className={styles['modal__close-button']}>
					<Icon iconId='close' />
				</button>
			</dialog>

			<button>Открыть</button>
		</>
	)
}
