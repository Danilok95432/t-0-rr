import { ChangeEvent, FC } from 'react'
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
		hasIconSearch = false,
		hasResetIcon = true,
		label,
		extraLabel,
		onChange,
		maxLength,
		disabled = false,
	} = props

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event)
	}

	const handleReset = () => {
		const event = {
			target: {
				value: '',
				name: id,
			},
			currentTarget: {
				value: '',
				name: id,
			},
		} as ChangeEvent<HTMLInputElement>

		onChange?.(event)
	}

	return (
		<div className={classNames(styles.wrapper, className)}>
			{label && <label className={styles['input-label']}>{label}</label>}

			{extraLabel && <span className={styles.extraLabel}>{extraLabel}</span>}

			<input
				name={id}
				id={id}
				value={value}
				className={classNames(styles.input, label ? styles['with-label'] : '')}
				placeholder={placeholder}
				onChange={handleChange}
				maxLength={maxLength}
				autoComplete='off'
				autoFocus={false}
				disabled={disabled}
			/>

			{!value && hasIconSearch && <Icon iconId='input-search' className={styles.input__icon} />}

			{disabled && <Icon iconId='lock' className={styles.input__icon_lock} />}

			{value && hasResetIcon && (
				<Button
					mode='clear'
					type='reset'
					icon={<Icon iconId='input-reset' />}
					className={styles.input__icon}
					onClick={handleReset}
				/>
			)}
		</div>
	)
}
