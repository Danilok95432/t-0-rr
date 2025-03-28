export interface InputProps {
	id: string
	value?: string
	placeholder?: string
	label?: string
	className?: string
	hasIcon?: boolean
	hasResetIcon?: boolean
	onChange: (event: string) => void
	error?: string
	maxLength?: number
}
