import { FC } from 'react'
import classNames from 'classnames'

import { IButtonProps } from '@/types/button'

import styles from './button.module.scss'

export const Button: FC<IButtonProps> = (props) => {
	const { className, type = 'button', label, mode = 'primary', icon, onClick } = props

	return (
		<button
			type={type}
			className={classNames(styles.button, className, { [styles[`button__${mode}`]]: mode })}
			onClick={onClick}
		>
			{label && <span>{label}</span>}

			{icon && icon}
		</button>
	)
}
