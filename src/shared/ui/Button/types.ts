import { MouseEvent, ReactElement } from 'react'

export interface IButtonProps {
	id?: string
	className?: string
	label?: string
	title?: string
	type?: 'button' | 'submit' | 'reset'
	mode?: 'primary' | 'secondary' | 'clear' | 'table' | 'warning_delete' | 'delete_transparent'
	tableMode?: 'edit' | 'delete' | 'approve'
	icon?: ReactElement
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
}
