import { FC } from 'react'
import styles from './checkbox.module.scss'

interface CheckBoxProps {
	label?: string
}

export const CheckBox: FC<CheckBoxProps> = ({ label }) => {
	return (
		<label className={styles['checkbox-wrapper']}>
			<input className={styles.checkbox} type='checkbox' />
			{label && <span className='label'>{label}</span>}
		</label>
	)
}
