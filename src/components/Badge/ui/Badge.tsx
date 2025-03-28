import { FC } from 'react'
import classNames from 'classnames'
import { IBadgeProps } from '@/types/badge'

import styles from './badge.module.scss'

export const Badge: FC<IBadgeProps> = ({ label, mode = 'default', classname }) => {
	return (
		<div className={classNames(styles.badge, classname, { [styles[`badge__${mode}`]]: mode })}>
			{label}
		</div>
	)
}
