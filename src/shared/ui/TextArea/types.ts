export interface ITextAreaProps {
	id?: string
	name?: string
	value?: string
	label?: string
	placeholder?: string
	className?: string
	onChange?: (value: string) => void
	disabled?: boolean
}
