import { FC } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'

import { ISelectProps } from '@/types/select'

import './select.scss'

export const SelectC: FC<ISelectProps> = (props) => {
	const { options, value = '', onChange, label, placeholder = '', className } = props

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value)
		onChange?.(event.target.value)
	}

	return (
		<div className={classNames('select-wrapper', className)}>
			{label && <label className='select-label'>{label}</label>}

			<Select
				multi
				options={options}
				onChange={onChange}
				className='select'
				placeholder={placeholder}
				searchable={false}
			/>
			{/* <select value={value} onChange={handleChange} className={styles.select}>
				{placeholder && <option value=''>{placeholder}</option>}

				{options.map((option) => (
					<option key={option.name} value={option.value}>
						{option.name}
					</option>
				))}
			</select> */}
		</div>
	)
}
