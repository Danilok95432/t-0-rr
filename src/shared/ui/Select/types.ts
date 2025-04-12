export type TSelectOption = {
	value: string
	label: string
}

export interface ISelectCProps {
	options: TSelectOption[]
	values: TSelectOption[]
	onChange: (value: TSelectOption[]) => void
	label?: string
	placeholder?: string
	className?: string
	disabled?: boolean
	searchable?: boolean
}
