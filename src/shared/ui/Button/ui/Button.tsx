import { FC } from 'react'
import classNames from 'classnames'

import { IButtonProps } from '../types'

import styles from './button.module.scss'

export const Button: FC<IButtonProps> = (props) => {
  const {
    id,
    className,
    type = 'button',
    label,
    mode = 'primary',
    icon,
    onClick,
    disabled,
    tableMode = 'base',
  } = props

  return (
    <button
      id={id}
      type={type}
      className={classNames(
        styles.button,
        className,
        { [styles[`button__${mode}`]]: mode },
        { [styles[`button__${tableMode}`]]: tableMode },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.wrapper}>
        {icon && icon}

        {label && <span>{label}</span>}
      </div>
    </button>
  )
}
