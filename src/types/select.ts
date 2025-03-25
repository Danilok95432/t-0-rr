type TOption = {
	value: string
	name: string
}

export interface ISelectProps {
	options: TOption[]
	value?: string
	onChange?: (value: string) => void
	label?: string
	placeholder?: string
	className?: string
}
