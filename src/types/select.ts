export type TSelectOption = {
	value: string
}

export interface ISelectCProps {
	options: TSelectOption[]
	values: TSelectOption[]
	onChange: (value: TSelectOption[]) => void
	label?: string
	placeholder?: string
	className?: string
}
