import { FC } from 'react'
import classNames from 'classnames'

import { IIconProps } from '@/types/icon'

import styles from './icon.module.scss'

export const Icon: FC<IIconProps> = ({ iconId, className }) => (
	<svg className={classNames(styles.icon, className)} aria-hidden='true'>
		<use href={`#icon-${iconId}`} />
	</svg>
)
