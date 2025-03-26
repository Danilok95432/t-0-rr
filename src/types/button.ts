import { MouseEvent, ReactElement } from 'react'

export interface IButtonProps {
	id?: string
	className?: string
	label?: string
	type?: 'button' | 'submit' | 'reset'
	mode?: 'primary' | 'secondary' | 'clear'
	icon?: ReactElement
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
}
