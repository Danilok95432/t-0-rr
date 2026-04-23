export interface SelOption {
  label: string
  value: string
}

export interface MultiSelOption {
  label: string
  value: string
  selected: boolean
  __originalLabel?: string
  __hiddenCount?: number
  __hiddenItems?: string[]
}

export interface FilterOperationData {
  org: MultiSelOption[]
  account: MultiSelOption[]
  contragent: MultiSelOption[]
  article: SelOption[]
  directions: MultiSelOption[]
  deals: SelOption[]
  cases: SelOption[]
  dateFrom: string
  dateTo: string
  rememberChoice?: string
}

export interface FilterDealData {
  org: MultiSelOption[]
  contragent: MultiSelOption[]
  dateFrom: string
  cases: SelOption[]
  dateTo: string
  dateApply: string
  rememberChoice?: string
}