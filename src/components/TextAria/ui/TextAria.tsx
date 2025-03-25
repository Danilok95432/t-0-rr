import { FC } from 'react'
import classNames from 'classnames'

import styles from './textAria.module.scss'

interface TextAriaProps {
	id: string
	value?: string
	label?: string
	placeholder?: string
	className?: string
	onChange?: (value: string) => void
}

export const TextAria: FC<TextAriaProps> = (props) => {
	const { id, value, label, placeholder, className, onChange } = props

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange?.(event.target.value)
	}

	return (
		<div className={classNames(styles.wrapper, className)}>
			{label && <label className={styles['textAria-label']}>{label}</label>}

			<textarea
				name={id}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				className={styles.textAria}
				spellCheck
			/>
		</div>
	)
}
