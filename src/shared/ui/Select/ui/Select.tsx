import { FC, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import Select, { SelectItemRenderer } from 'react-dropdown-select'

import { ISelectCProps, TSelectOption } from '../types'
import { MultiSelOption } from '@/features/filtersMenu/types/type'
import { Icon } from '@/shared/ui/Icon'

import './select.scss'

type SelectOption = TSelectOption | MultiSelOption

export const SelectC: FC<ISelectCProps> = (props) => {
  const {
    options,
    values,
    value,
    onChange,
    label,
    placeholder = '',
    className,
    disabled,
    searchable,
    multiselect = false,
    maxDisplayedTags = 1,
    displayedTagSuffix = '+ {count}',
  } = props

  const [isFocused, setIsFocused] = useState(false)

  const computedValues = useMemo<SelectOption[]>(() => {
    if ((!values || values.length === 0) && value) {
      return [value as SelectOption]
    }

    return (values ?? []) as SelectOption[]
  }, [values, value])

  const normalizedOptions = useMemo<SelectOption[]>(() => {
    return (options ?? []) as SelectOption[]
  }, [options])

  const handleChange = useCallback(
    (newValues: SelectOption[]) => {
      onChange(newValues as TSelectOption[] | MultiSelOption[])
    },
    [onChange],
  )


  const customOptionRenderer = useCallback(
    ({ item, state, methods, props }: SelectItemRenderer<SelectOption>) => {
      if (!multiselect) {
        return <span>{item.label}</span>
      }

      const valueField = props.valueField || 'value'

      const currentIndex = state.values.findIndex((selectedItem) => {
        const selectedValue = selectedItem?.[valueField as keyof SelectOption]
        const currentValue = item?.[valueField as keyof SelectOption]

        return selectedValue === currentValue
      })

      if (currentIndex === -1) {
        return null
      }

      if (maxDisplayedTags <= 0 || currentIndex < maxDisplayedTags) {
        return (
          <span className='select__tag'>
            {item.label}
            {!disabled && (
              <span
                className='select__tag-remove'
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  methods.removeItem(e, item, false)
                }}
              >
                ×
              </span>
            )}
          </span>
        )
      }

      if (currentIndex === maxDisplayedTags) {
        const hiddenValues = state.values.slice(maxDisplayedTags)
        const hiddenCount = hiddenValues.length

        if (hiddenCount <= 0) {
          return null
        }

        return (
          <span
            className='select__tag select__tag--count'
            title={hiddenValues.map((v) => v.label).join(', ')}
          >
            {displayedTagSuffix.replace('{count}', String(hiddenCount))}
          </span>
        )
      }

      return null
    },
    [disabled, displayedTagSuffix, maxDisplayedTags, multiselect],
  )

  return (
    <div className={classNames('select-wrapper', className)}>
      <Select<SelectOption>
        values={computedValues}
        options={normalizedOptions}
        onChange={handleChange}
        className='select'
        placeholder={placeholder}
        searchable={searchable}
        multi={multiselect}
        disabled={disabled}
        optionRenderer={multiselect ? customOptionRenderer : undefined}
        onDropdownOpen={() => setIsFocused(true)}
        onDropdownClose={() => setIsFocused(false)}
        searchBy='label'
        dropdownHandle={false}
      />

      {label && (
        <label
          className={classNames('select-label', {
            'select-label--focused': isFocused || computedValues.length > 0,
          })}
        >
          {label}
        </label>
      )}

      {disabled && <Icon iconId='lock' className='select__icon_lock' />}
    </div>
  )
}
