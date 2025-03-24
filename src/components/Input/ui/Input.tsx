import { FC, useState } from 'react'
import classNames from 'classnames'

import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './input.module.scss'

interface InputProps {
	id: string
	type?: string
	placeholder?: string
	className?: string
}

export const Input: FC<InputProps> = (props) => {
	const { id, type = 'text', placeholder, className } = props
	const [value, setValue] = useState<string>('')

	return (
		<div className={styles.wrapper}>
			<input
				type={type}
				name={id}
				id={id}
				className={classNames(styles.input, className)}
				placeholder={placeholder}
				value={value || ''}
				onChange={(e) => setValue(e.target.value)}
			/>

			{!value && <Icon iconId='input-search' className={styles.input__icon} />}

			{value && (
				<Button
					mode='clear'
					type='button'
					icon={<Icon iconId='input-reset' />}
					className={styles.input__icon}
					onClick={() => setValue('')}
				/>
			)}
		</div>
	)
}
