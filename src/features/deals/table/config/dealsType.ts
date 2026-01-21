import { TSelectOption } from "@/shared/ui/Select/types"

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
  contragent: string
  date: string
  amount: string
  paid: string
  arrears: string
  case: string
}

export type DealInfo = {
  deal_name: string
  case: string
  dogovor_name: string
  deal_name_full: string
  org: string
  cases_list: TSelectOption[]
  orgs_list: TSelectOption[]
  contragents_list: TSelectOption[]
  contragent: string
  deal_date: string
  deal_plan_rashod: string
}

export type DealInfoSave = {
  deal_short_name: string
  deal_name_full: string
  id_case: string
  id_org: string
  id_contragent: string
  dogorov_name: string
  deal_date: Date
  deal_plan_rashod: string
}

export type DealInfoView = {
  deal_name: string
  case: string
  dogovor_name: string
  deal_name_full: string
  org: string
  contragent: string
  deal_date: string
  deal_plan_rashod: string
}

export type CaseDealInfo = {
  id: string
  case_name: string
}

export type OrgDealInfo = {
  id: string
  org_name: string
}

export type ContragentDealInfo = {
  id: string
  contragent_name: string
}
