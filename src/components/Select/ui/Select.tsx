import { FC } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { ISelectCProps } from '@/types/select'

import './select.scss'

export const SelectC: FC<ISelectCProps> = (props) => {
	const { options, values, onChange, label, placeholder = '', className } = props

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
			/>
		</div>
	)
}
