import { ChangeEvent } from 'react'

export interface InputProps {
	id: string
	value?: string
	placeholder?: string
	label?: string
	extraLabel?: string
	className?: string
	hasIconSearch?: boolean
	hasResetIcon?: boolean
	onChange?: (event?: ChangeEvent<HTMLInputElement>) => void
	error?: string
	maxLength?: number
	disabled?: boolean
}
