import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import { IInputProps } from '../types'

import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import styles from './input.module.scss'

export const Input: FC<IInputProps> = (props) => {
  const {
    id,
    value,
    placeholder,
    className,
    type = 'text',
    hasIconSearch = false,
    hasResetIcon = true,
    label,
    extraLabel,
    onChange,
    maxLength,
    disabled = false,
    error,
    autoFocus,
    isSum = false, // добавляем флаг isSum
    isSearch = false,
  } = props

  // Форматирование суммы с разделением по разрядам
  const formatSumValue = useCallback((rawValue: string): string => {
    if (!rawValue) return ''

    // Удаляем все пробелы и заменяем запятую на точку для унификации
    const cleanValue = rawValue.replace(/\s/g, '').replace(',', '.')

    // Проверяем, является ли значение числом (включая десятичные дроби)
    const regex = /^\d*\.?\d*$/
    if (!regex.test(cleanValue)) return rawValue

    // Разделяем целую и дробную части
    const parts = cleanValue.split('.')
    let integerPart = parts[0]
    const decimalPart = parts[1] || ''

    // Форматируем целую часть с пробелами каждые 3 цифры
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    // Собираем обратно
    if (decimalPart) {
      return `${integerPart}.${decimalPart}`
    }
    return integerPart
  }, [])

  // Обратное преобразование: из форматированного значения в чистое число
  const unformatSumValue = useCallback((formattedValue: string): string => {
    return formattedValue.replace(/\s/g, '')
  }, [])

  // Внутреннее состояние для форматированного значения (только для isSum)
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (!isSum) return value?.toString() || ''
    return formatSumValue(value?.toString() || '')
  })

  // Синхронизация внешнего значения с внутренним при isSum = true
  useEffect(() => {
    if (isSum) {
      const externalValue = value?.toString() || ''
      const unformattedDisplay = unformatSumValue(displayValue)

      // Если внешнее значение отличается от текущего отображаемого (без форматирования)
      if (externalValue !== unformattedDisplay) {
        setDisplayValue(formatSumValue(externalValue))
      }
    }
  }, [value, isSum, formatSumValue, unformatSumValue, displayValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    if (isSum) {
      // Обработка ввода для суммы
      // Разрешаем только цифры, точку и запятую
      let cleaned = newValue.replace(/[^\d.,]/g, '')

      // Заменяем запятую на точку
      cleaned = cleaned.replace(',', '.')

      // Проверяем количество точек (не более одной)
      const dotCount = (cleaned.match(/\./g) || []).length
      if (dotCount > 1) {
        // Если точек больше одной, оставляем только первую
        const firstDotIndex = cleaned.indexOf('.')
        cleaned =
          cleaned.substring(0, firstDotIndex + 1) +
          cleaned.substring(firstDotIndex + 1).replace(/\./g, '')
      }

      // Ограничиваем количество знаков после запятой (максимум 2)
      if (cleaned.includes('.')) {
        const [integer, decimal] = cleaned.split('.')
        if (decimal && decimal.length > 2) {
          cleaned = `${integer}.${decimal.slice(0, 2)}`
        }
      }

      // Форматируем с пробелами
      const formatted = formatSumValue(cleaned)
      setDisplayValue(formatted)

      // Создаем событие с очищенным значением (без пробелов)
      const cleanValue = unformatSumValue(formatted)
      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value: cleanValue,
          name: id,
        },
        currentTarget: {
          ...event.currentTarget,
          value: cleanValue,
          name: id,
        },
      } as ChangeEvent<HTMLInputElement>

      onChange?.(newEvent)
    } else {
      // Обычная обработка без маски
      onChange?.(event)
    }
  }

  const handleReset = () => {
    if (isSum) {
      setDisplayValue('')
    }

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

  // Определяем, какое значение показывать в инпуте
  const inputValue = isSum ? displayValue : value

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input
        name={id}
        id={id}
        value={inputValue}
        type={isSum ? 'text' : type} // Для суммы используем text, чтобы не мешать форматированию
        className={
          (classNames(styles.input, { [styles.searchInput]: isSearch }, (label && !isSearch) ? styles['with-label'] : ''))
        }
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete='off'
        autoFocus={autoFocus}
        disabled={disabled}
      />

      <span className={styles.error}>{error}</span>

      {/* основной лейбл */}
      {label && (
        <label className={classNames(styles.label, inputValue && styles.label_top)}>{label}</label>
      )}
      {/* на некоторых инпутах есть дополнительные лейблы */}
      {extraLabel && <span className={styles.extraLabel}>{extraLabel}</span>}
      {/* иконка поиска */}
      {!inputValue && hasIconSearch && (
        <Icon iconId='input-search' className={styles.input__icon} />
      )}
      {/* иконка замочка */}
      {disabled && <Icon iconId='lock' className={styles.input__icon_lock} />}
      {/* кнопка стереть содержимое инпута */}
      {inputValue && hasResetIcon && (
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
