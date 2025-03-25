export interface ITextAreaProps {
	id: string
	value?: string
	label?: string
	placeholder?: string
	className?: string
	onChange?: (value: string) => void
}
