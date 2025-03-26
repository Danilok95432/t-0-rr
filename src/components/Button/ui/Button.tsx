import { FC } from 'react'
import classNames from 'classnames'

import { IButtonProps } from '@/types/button'

import styles from './button.module.scss'

export const Button: FC<IButtonProps> = (props) => {
	const { id, className, type = 'button', label, mode = 'primary', icon, onClick, disabled } = props

	return (
		<button
			id={id}
			type={type}
			className={classNames(styles.button, className, { [styles[`button__${mode}`]]: mode })}
			onClick={onClick}
			disabled={disabled}
		>
			{label && <span>{label}</span>}

			{icon && icon}
		</button>
	)
}
