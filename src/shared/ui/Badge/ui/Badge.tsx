import { FC } from 'react'
import classNames from 'classnames'
import { IBadgeProps } from '../types'

import styles from './badge.module.scss'

export const Badge: FC<IBadgeProps> = ({ label, mode = 'default', className }) => {
	return (
		<div className={classNames(styles.badge, className, { [styles[`badge__${mode}`]]: mode })}>
			{label}
		</div>
	)
}
