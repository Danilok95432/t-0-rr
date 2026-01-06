export type TSelectOption = {
  value: string
  label: string
}

export type TSelectOptionDirection = {
  value: string
  label: string
  direction: string
}

export type TSelectOptionParent = {
  value: string
  label: string
  direction: string
  article_exp: string
}

export interface ISelectCProps {
  options: TSelectOption[]
  values: TSelectOption[]
  value?: TSelectOption | null
  onChange: (value: TSelectOption[]) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  searchable?: boolean
}
