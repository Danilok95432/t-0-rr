import { FC } from 'react'
import classNames from 'classnames'

import { InputProps } from '@/types/input'

import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './input.module.scss'

export const Input: FC<InputProps> = (props) => {
	const {
		id,
		value,
		placeholder,
		className,
		hasIcon = false,
		hasResetIcon = true,
		label,
		onChange,
		maxLength,
	} = props

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.currentTarget.value)
	}

	const handleReset = () => {
		onChange?.('')
	}

	return (
		<div className={classNames(styles.wrapper, className)}>
			{label && <label className={styles['input-label']}>{label}</label>}

			<input
				name={id}
				id={id}
				value={value}
				className={classNames(styles.input, label ? styles['with-label'] : '')}
				placeholder={placeholder}
				onChange={handleChange}
				maxLength={maxLength}
				autoComplete='false'
				autoFocus={false}
			/>

			{!value && hasIcon ? <Icon iconId='input-search' className={styles.input__icon} /> : null}

			{value && hasResetIcon ? (
				<Button
					mode='clear'
					type='reset'
					icon={<Icon iconId='input-reset' />}
					className={styles.input__icon}
					onClick={handleReset}
				/>
			) : null}
		</div>
	)
}
