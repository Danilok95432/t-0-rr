import { FC } from 'react'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'
import { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'

import { IInputDateProps } from '../types'

import 'react-datepicker/dist/react-datepicker.css'
import './inputDate.scss'

registerLocale('ru', ru)

export const InputDate: FC<IInputDateProps> = (props) => {
	const { date, onChange, className, label, popperPlacement = 'bottom-start' } = props

	return (
		<div className={classNames('datepicker-root', className)}>
			{label && <label className='datepicker-root__label'>{label}</label>}

			<DatePicker
				selected={date || new Date()}
				onChange={onChange}
				dateFormat='dd.MM.yyyy'
				className='datepicker'
				dropdownMode='select'
				locale='ru'
				placeholderText='Выберите диапазон дат'
				popperPlacement={popperPlacement}
			/>
		</div>
	)
}
