import { FC, useState } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { ISelectCProps } from '../types'

import { Icon } from '@/shared/ui/Icon'

import './select.scss'

export const SelectC: FC<ISelectCProps> = (props) => {
	const { options, values, onChange, label, placeholder = '', className, disabled } = props
	const [isFocused, setIsFocused] = useState(false)

	return (
		<div className={classNames('select-wrapper', className)}>
			<Select
				values={values}
				options={options}
				onChange={onChange}
				className='select'
				placeholder={placeholder}
				searchable={false}
				multi={false}
				disabled={disabled}
				onDropdownOpen={() => setIsFocused(true)}
				onDropdownClose={() => setIsFocused(false)}
			/>
			{/* Основной лейбл */}
			{label && (
				<label
					className={classNames('select-label', {
						'select-label--focused': isFocused || values.length > 0,
					})}
				>
					{label}
				</label>
			)}
			{/* Иконка замочка */}
			{disabled && <Icon iconId='lock' className='select__icon_lock' />}
		</div>
	)
}
