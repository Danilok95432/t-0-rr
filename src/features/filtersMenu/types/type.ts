export interface SelOption {
  label: string
  value: string
}

export interface MultiSelOption {
  label: string
  value: string
  selected: boolean
}

export interface FilterData {
  org: MultiSelOption[]
  account: MultiSelOption[]
  contragent: MultiSelOption[]
  article: SelOption[]
  directions: MultiSelOption[]
  deals: SelOption[]
  cases: SelOption[]
  dateFrom: string
  dateTo: string
}