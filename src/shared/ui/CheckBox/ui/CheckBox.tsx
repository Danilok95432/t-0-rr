import { FC } from 'react'

import { ICheckBoxProps } from '../types'

import styles from './checkbox.module.scss'

export const CheckBox: FC<ICheckBoxProps> = ({ id, name, value, label, checked, onChange }) => {
	return (
		<label className={styles['checkbox-wrapper']}>
			<input
				className={styles.checkbox}
				type='checkbox'
				id={id}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			{label && <span className='label'>{label}</span>}
		</label>
	)
}
