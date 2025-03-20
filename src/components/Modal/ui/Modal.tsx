import { FC, ReactNode, useEffect, useRef } from 'react'
import { Icon } from '@/components/Icon'

import styles from './modal.module.scss'

interface ModalProps {
	isOpen: boolean // Состояние модального окна (открыто/закрыто)
	onClose: () => void // Функция для закрытия модального окна
	children: ReactNode // Динамическое содержимое модального окна
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	console.log(isOpen)
	// Управление открытием/закрытием модального окна
	useEffect(() => {
		const dialog = dialogRef.current

		if (dialog) {
			if (isOpen) {
				dialog.showModal() // Открываем модальное окно
			} else {
				dialog.close() // Закрываем модальное окно
			}
		}
	}, [isOpen])

	return (
		<dialog className={styles.modal} ref={dialogRef}>
			{children}
			<button type='button' onClick={onClose} className={styles['modal__close']}>
				<Icon iconId='close' />
			</button>
		</dialog>
	)
}
