import { DealsDTO, IDealsData } from '../table/config/dealsType'

export const mapDeals = (dealsBack: DealsDTO): IDealsData => {
  return {
    id: dealsBack.id,
    shortName: dealsBack.deal_short_name,
    fullName: dealsBack.deal_name,
    organization: dealsBack.org,
    counterparty: dealsBack.contragent,
    date: dealsBack.deal_date,
    amount: dealsBack.deal_summ,
    paid: dealsBack.deal_payed,
    arrears: dealsBack.deal_dolg,
    case: dealsBack.case,
  }
}
