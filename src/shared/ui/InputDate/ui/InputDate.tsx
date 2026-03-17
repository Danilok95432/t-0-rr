import { FC } from 'react'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'
import { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'
import { parse } from 'date-fns' // Добавьте импорт

import { IInputDateProps } from '../types'

import 'react-datepicker/dist/react-datepicker.css'
import './inputDate.scss'

registerLocale('ru', ru)

export const InputDate: FC<IInputDateProps> = (props) => {
	const { date, onChange, className, label, popperPlacement = 'bottom-start', disabled } = props

	const parseDate = (dateValue: string | Date | null): Date | null => {
		if (!dateValue) return null
		
		if (dateValue instanceof Date) return dateValue
		
		if (typeof dateValue === 'string') {
			return parse(dateValue, 'dd.MM.yyyy', new Date())
		}
		
		return null
	}

	return (
		<div className={classNames('datepicker-root', className)}>
			{label && <label className='datepicker-root__label'>{label}</label>}

			<DatePicker
				selected={parseDate(date)}
				onChange={onChange}
				dateFormat='dd.MM.yyyy'
				className='datepicker'
				dropdownMode='select'
				locale='ru'
				placeholderText='Выберите дату'
				popperPlacement={popperPlacement}
				disabled={disabled}
			/>
		</div>
	)
}