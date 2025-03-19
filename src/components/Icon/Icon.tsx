import { FC } from 'react'
import classNames from 'classnames'

export interface IconProps {
	iconId: string
	className?: string
}

export const Icon: FC<IconProps> = ({ iconId, className }) => (
	<svg className={classNames('icon', className)} aria-hidden='true'>
		<use href={`#icon-${iconId}`} />
	</svg>
)
