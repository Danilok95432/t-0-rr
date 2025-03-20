import { FC } from 'react'
import classNames from 'classnames'

import styles from './icon.module.scss'

export interface IconProps {
	iconId: string
	className?: string
}

export const Icon: FC<IconProps> = ({ iconId, className }) => (
	<svg className={classNames(styles.icon, className)} aria-hidden='true'>
		<use href={`#icon-${iconId}`} />
	</svg>
)
