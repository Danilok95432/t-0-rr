export interface IInputProps {
	id: string
	value?: string
	type?: string
	placeholder?: string
	label?: string
	className?: string
	hasIcon?: boolean
	onChange?: (value: string) => void
}
