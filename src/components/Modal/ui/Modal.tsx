import { FC, ReactNode, useEffect, useRef } from 'react'
import { Icon } from '@/components/Icon'

import styles from './modal.module.scss'

interface ModalProps {
	isOpen?: boolean
	onClose: () => void
	title?: string
	children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	return (
		<dialog className={styles.modal} ref={dialogRef}>
			{children}
			<button type='button' onClick={onClose} className={styles['modal__close']}>
				<Icon iconId='close' />
			</button>
		</dialog>
	)
}
