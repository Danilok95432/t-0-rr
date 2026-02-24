import { FC, useState, useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { ISelectCProps, TSelectOption } from '../types'

import { Icon } from '@/shared/ui/Icon'

import './select.scss'
import { MultiSelOption } from '@/features/filtersMenu/types/type'

export const SelectC: FC<ISelectCProps> = (props) => {
  const {
    options,
    values,
    value,            // 👈 новый проп
    onChange,
    label,
    placeholder = '',
    className,
    disabled,
    searchable,
    multiselect = false,
  } = props

  const [isFocused, setIsFocused] = useState(false)

  // Мемоизированные "текущие значения" для селекта
  const computedValues = useMemo<TSelectOption[] | MultiSelOption[]>(() => {
    // если в форме ещё ничего нет, а default value передали — показываем его
    if ((!values || values.length === 0) && value) {
      return [value]
    }
    return values ?? []
  }, [values, value])

  // Если передали default value и поле ещё пустое — один раз проставляем его наружу
  useEffect(() => {
    if (!value) return

    const hasValue = Array.isArray(values) && values.length > 0
    if (!hasValue) {
      // проставляем в форму / наружу
      onChange([value])
    }
  }, [value, values, onChange])

  const handleChange = useCallback(
    (newValues: TSelectOption[] | MultiSelOption[]) => {
      onChange(newValues)
    },
    [onChange]
  )

  const hasAnyValue = computedValues && computedValues.length > 0

  return (
    <div className={classNames('select-wrapper', className)}>
      <Select
        values={computedValues}
        options={options}
        onChange={handleChange}
        className='select'
        placeholder={placeholder}
        searchable={searchable}
        multi={multiselect}
        disabled={disabled}
        onDropdownOpen={() => setIsFocused(true)}
        onDropdownClose={() => setIsFocused(false)}
        searchBy='label'
      />

      {label && (
        <label
          className={classNames('select-label', {
            'select-label--focused': isFocused || hasAnyValue,
          })}
        >
          {label}
        </label>
      )}

      {disabled && <Icon iconId='lock' className='select__icon_lock' />}
    </div>
  )
}
