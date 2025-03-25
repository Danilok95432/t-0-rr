import { FC } from 'react'

import { ICheckBoxProps } from '@/types/checkbox'

import styles from './checkbox.module.scss'

export const CheckBox: FC<ICheckBoxProps> = ({ label }) => {
	return (
		<label className={styles['checkbox-wrapper']}>
			<input className={styles.checkbox} type='checkbox' />
			{label && <span className='label'>{label}</span>}
		</label>
	)
}
