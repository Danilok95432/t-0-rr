import { FC } from 'react'

import { IRadioButtonProps } from '../types'

import styles from './radio-button.module.scss'

export const RadioButton: FC<IRadioButtonProps> = ({
	id,
	name,
	value,
	label,
	checked,
	onChange,
}) => {
	return (
		<label className={styles['radio-wrapper']}>
			<input
				type='radio'
				className={styles.radio}
				id={id}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			{label && <span className={styles.radioButton__label}>{label}</span>}
		</label>
	)
}
