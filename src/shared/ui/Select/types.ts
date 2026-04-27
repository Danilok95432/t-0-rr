import { MultiSelOption } from '@/features/filtersMenu/types/type'

export type TSelectOption = {
  value: string
  label: string
  __originalLabel?: string
  __hiddenCount?: number
  __hiddenItems?: string[]
}

export type TSelectOptionArticle = {
  value: string
  label: string
  id_parent: string
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
  options: TSelectOption[] | MultiSelOption[]
  values: TSelectOption[] | MultiSelOption[]
  value?: TSelectOption | MultiSelOption | null
  onChange: (value: TSelectOption[] | MultiSelOption[]) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  searchable?: boolean
  multiselect?: boolean
  maxDisplayedTags?: number
  displayedTagSuffix?: string
  dropdownPositionTop?: boolean
}
