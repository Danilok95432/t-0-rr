import { FC } from 'react'
import classNames from 'classnames'

import styles from './select.module.scss'

type Option = {
	value: string
	name: string
}

interface SelectProps {
	options: Option[]
	value?: string
	onChange?: (value: string) => void
	label?: string
	placeholder?: string
	className?: string
}

export const Select: FC<SelectProps> = (props) => {
	const { options, value = '', onChange, label, placeholder, className } = props

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value)
		onChange?.(event.target.value)
	}

	return (
		<div className={classNames(styles['select-wrapper'], className)}>
			{label && <label className={styles['select-label']}>{label}</label>}
			<select value={value} onChange={handleChange} className={styles.select}>
				{placeholder && <option value=''>{placeholder}</option>}
				{options.map((option) => (
					<option key={option.name} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}
