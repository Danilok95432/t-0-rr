import { FC, ReactElement } from 'react'
import classNames from 'classnames'

import styles from './button.module.scss'

interface ButtonProps {
	id?: string
	className?: string
	label?: string
	type?: 'button' | 'submit' | 'reset'
	mode?: 'primary' | 'secondary' | 'clear'
	icon?: ReactElement
	onClick?: () => void
}

export const Button: FC<ButtonProps> = (props) => {
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
