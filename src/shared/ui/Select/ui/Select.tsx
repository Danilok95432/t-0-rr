import { FC, useState, useCallback } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { ISelectCProps, TSelectOption } from '../types'

import { Icon } from '@/shared/ui/Icon'

import './select.scss'

export const SelectC: FC<ISelectCProps> = (props) => {
	const {
		options,
		values,
		onChange,
		label,
		placeholder = '',
		className,
		disabled,
		searchable,
	} = props
	const [isFocused, setIsFocused] = useState(false)

	const handleChange = useCallback(
		/* если новое значение пустое и старое значение пустое, то ничего не делаем */
		(newValues: TSelectOption[]) => {
			if (newValues.length === 0 && values.length === 0) {
				return
			}

			onChange(newValues)
		},
		[onChange, values]
	)

	return (
		<div className={classNames('select-wrapper', className)}>
			<Select
				values={values}
				options={options}
				onChange={handleChange}
				className='select'
				placeholder={placeholder}
				searchable={searchable}
				multi={false}
				disabled={disabled}
				onDropdownOpen={() => setIsFocused(true)}
				onDropdownClose={() => setIsFocused(false)}
				searchBy='label'
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
