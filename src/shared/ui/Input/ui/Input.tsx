import { ChangeEvent, FC } from 'react'
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
  } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }

  const handleReset = () => {
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

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input
        name={id}
        id={id}
        value={value}
        type={type}
        className={classNames(styles.input, label ? styles['with-label'] : '')}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        autoComplete='off'
        autoFocus={false}
        disabled={disabled}
      />

      <span className={styles.error}>{error}</span>

      {/* основной лейбл */}
      {label && (
        <label className={classNames(styles.label, value && styles.label_top)}>{label}</label>
      )}
      {/* на некоторых инпуитах есть дополнительные лейблы */}
      {extraLabel && <span className={styles.extraLabel}>{extraLabel}</span>}
      {/* иконка поиска */}
      {!value && hasIconSearch && <Icon iconId='input-search' className={styles.input__icon} />}
      {/* иконка замочка */}
      {disabled && <Icon iconId='lock' className={styles.input__icon_lock} />}
      {/* кнопка стереть содержимое инпута */}
      {value && hasResetIcon && (
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
