export interface IInputDateProps {
	date: Date | null
	onChange?: (date: Date | null) => void
	className?: string
	label?: string
	disabled?: boolean
	popperPlacement?:
		| 'left'
		| 'right'
		| 'bottom-start'
		| 'top'
		| 'bottom'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end'
		| 'top-start'
		| 'top-end'
		| 'bottom-end'
}
