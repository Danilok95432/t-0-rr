import { FC, ReactNode, useEffect } from 'react'
import { useModal } from '../model/useModal'

import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'

import styles from './modal.module.scss'

interface ModalProps {
	title?: string
	children: ReactNode
}

export const Modal: FC<ModalProps> = ({ title, children }) => {
	const { dialogRef, isOpenModal, handleClose } = useModal()

	useEffect(() => {
		if (isOpenModal) {
			dialogRef.current?.showModal()

			const closeByEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					handleClose()
				}
			}
			document.addEventListener('keydown', closeByEscape)

			return () => document.removeEventListener('keydown', closeByEscape)
		} else {
			dialogRef.current?.close()
		}
	}, [dialogRef, isOpenModal, handleClose])

	return (
		<dialog className={styles.modal} ref={dialogRef}>
			<h2 className={styles.modal__title}>{title}</h2>

			{children}

			<Button
				mode='clear'
				icon={<Icon iconId='close' />}
				className={styles['modal__close']}
				onClick={handleClose}
			/>
		</dialog>
	)
}
