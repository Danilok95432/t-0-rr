import { format, isValid } from 'date-fns'
import { TSelectOption } from '../ui/Select/types'

export const transformStringToDate = (dateString: string): Date | null => {
  const dateParts = dateString.split('.')

  if (dateParts.length !== 3) {
    return null
  }

  const day = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10)
  const year = parseInt(dateParts[2], 10)

  if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
    return null
  }
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }
  return date
}

export const formatDateToYYYYMMDD = (
  date: Date | string | null | undefined,
  separator?: string | undefined,
  variant?: number
): string => {
  if (date === '') return ''
  if (!separator || separator === '') separator = '-'
  if (!date) {
    return 'Invalid Date'
  }

  let parsedDate: Date

  if (typeof date === 'string') {
    try {
      parsedDate = new Date(date)
      if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date'
      }
    } catch (err) {
      return `Invalid Date ${err}`
    }
  } else if (date instanceof Date) {
    parsedDate = date
  } else {
    return 'Invalid Date'
  }

  if (!isValid(parsedDate)) {
    return 'Invalid Date'
  }

  try {
    let formattedDate: string
    if (variant === 2) formattedDate = format(parsedDate, `dd${separator}MM${separator}yyyy`)
    else formattedDate = format(parsedDate, `yyyy${separator}MM${separator}dd`)
    return formattedDate
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}

export const getFirstValue = (field: TSelectOption[]): string => {
  if (!field) return ''

  // обычный случай: массив [{ value, label }]
  if (Array.isArray(field)) {
    const opt = field[0]
    if (opt && opt.value !== undefined && opt.value !== null) {
      return String(opt.value)
    }
    return ''
  }

  // случай, когда мы зачем-то сохраняли строку (как в directions_list)
  if (typeof field === 'string' || typeof field === 'number') {
    return String(field)
  }

  return ''
}
