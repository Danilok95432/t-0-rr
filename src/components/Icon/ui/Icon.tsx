import { FC } from 'react'
import classNames from 'classnames'

import { IconProps } from '@/types/icon'

import styles from './icon.module.scss'

export const Icon: FC<IconProps> = ({ iconId, className, width, height }) => (
	<svg
		className={classNames(styles.icon, className)}
		aria-hidden='true'
		width={width}
		height={height}
	>
		<use href={`#icon-${iconId}`} />
	</svg>
)
