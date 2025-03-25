import { FC } from 'react'
import classNames from 'classnames'

import { ISelectProps } from '@/types/select'

import styles from './select.module.scss'

export const Select: FC<ISelectProps> = (props) => {
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
