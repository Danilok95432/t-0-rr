import { ChangeEvent } from 'react'

export interface IInputProps {
  id: string
  value?: string
  placeholder?: string
  label?: string
  extraLabel?: string
  className?: string
  type?: 'text' | 'email' | 'password' | 'number'
  hasIconSearch?: boolean
  hasResetIcon?: boolean
  onChange?: (event?: ChangeEvent<HTMLInputElement>) => void
  error?: string
  maxLength?: number
  disabled?: boolean
  autoFocus?: boolean
}
