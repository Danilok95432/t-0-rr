import { ChangeEvent } from 'react'

export interface IRadioButtonProps {
	id?: string
	name?: string
	value?: string
	label?: string
	checked?: boolean
	className?: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
