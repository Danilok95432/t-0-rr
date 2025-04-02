import { FC } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { ISelectCProps } from '../types'

import { Icon } from '@/shared/ui/Icon'

import './select.scss'

export const SelectC: FC<ISelectCProps> = (props) => {
	const { options, values, onChange, label, placeholder = '', className, disabled } = props

	return (
		<div className={classNames('select-wrapper', className)}>
			{label && <label className='select-label'>{label}</label>}

			<Select
				values={values}
				options={options}
				onChange={onChange}
				className='select'
				placeholder={placeholder}
				searchable={false}
				multi={false}
				disabled={disabled}
			/>

			{disabled && <Icon iconId='lock' className='select__icon_lock' />}
		</div>
	)
}
