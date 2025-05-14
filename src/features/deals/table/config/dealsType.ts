export type DealsDTO = {
  id: string
  deal_short_name: string
  deal_name: string
  org: string
  contragent: string
  deal_date: string
  deal_summ: string
  deal_payed: string
  deal_dolg: string
  case: string
}

export interface IDealsData {
  id: string
  shortName: string
  fullName: string
  organization: string
  counterparty: string
  date: string
  amount: string
  paid: string
  arrears: string
  case: string
}
