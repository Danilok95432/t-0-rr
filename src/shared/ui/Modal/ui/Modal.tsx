import { FC, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import classNames from 'classnames'

import { IModalProps } from '../types'
import { useModal } from '@/features/modal/hooks/useModal'

import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/Button'

import styles from './modal.module.scss'

export const Modal: FC<IModalProps> = ({ title, children, className }) => {
	const { isOpenModal, handleCloseModal } = useModal()

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

	return (
		<div className={classNames(styles.overlay, { [styles.visible]: isOpenModal })}>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: [0, 0.71, 0.2, 1.01],
				}}
			>
				<div className={classNames(styles.content, className)}>
					<h2 className={styles.title}>{title}</h2>

					{children}

					<Button
						type='submit'
						mode='clear'
						icon={<Icon iconId='close' width='24px' height='24px' />}
						className={styles.modal_close}
						onClick={handleCloseModal}
					/>
				</div>
			</motion.div>
		</div>
	)
}
