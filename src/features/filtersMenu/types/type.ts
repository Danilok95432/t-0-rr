export interface SelOption {
  label: string
  value: string
}

export interface MultiSelOption {
  label: string
  value: string
  selected: boolean
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
}

export interface FilterDealData {
  org: MultiSelOption[]
  contragent: MultiSelOption[]
  deal_name: string
  cases: SelOption[]
  dateDogovor: string
  dateApply: string
}