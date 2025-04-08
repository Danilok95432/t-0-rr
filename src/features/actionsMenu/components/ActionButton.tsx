import { FC } from 'react'
import classNames from 'classnames'
import { IActionButtonProps } from '../types'

import { Button } from '@/shared/ui/Button'

import styles from './action-button.module.scss'

export const ActionButton: FC<IActionButtonProps> = ({ action }) => {
	const { id, onClick, isActive } = action

	return (
		<Button
			id={id}
			mode='clear'
			className={classNames(styles.actionButton, styles[id], {
				[styles.active]: isActive,
			})}
			onClick={onClick}
		/>
	)
}
