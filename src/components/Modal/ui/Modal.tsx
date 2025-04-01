import { FC, useEffect } from 'react'

import { IModalProps } from '@/types/modal'
import { useModal } from '@/hooks/useModal'

import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'

import styles from './modal.module.scss'
import classNames from 'classnames'

export const Modal: FC<IModalProps> = ({ title, children, className }) => {
	const { dialogRef, isOpenModal, handleCloseModal } = useModal()

	// Закрыть модалку на кнопку Esc
	useEffect(() => {
		if (isOpenModal) {
			dialogRef.current?.showModal()

			const closeByEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					handleCloseModal()
				}
			}
			document.addEventListener('keydown', closeByEscape)

			return () => document.removeEventListener('keydown', closeByEscape)
		} else {
			dialogRef.current?.close()
		}
	}, [dialogRef, isOpenModal, handleCloseModal])

	return (
		<dialog className={classNames(styles.modal, className)} ref={dialogRef}>
			<h2 className={styles.modal__title}>{title}</h2>

			{children}

			<Button
				mode='clear'
				icon={<Icon iconId='close' width='24px' height='24px' />}
				className={styles['modal__close']}
				onClick={handleCloseModal}
			/>
		</dialog>
	)
}
