import { DealsDTO } from '../table/config/dealsType'

export const mapDeals = (dealsBack: DealsDTO): DealsDTO => {
  return {
    id: dealsBack.id,
    deal_short_name: dealsBack.deal_short_name,
    deal_name: dealsBack.deal_name,
    org: dealsBack.org,
    contragent: dealsBack.contragent,
    deal_date: dealsBack.deal_date,
    deal_summ: dealsBack.deal_summ,
    deal_payed: dealsBack.deal_payed,
    deal_dolg: dealsBack.deal_dolg,
    case: dealsBack.case,
  }
}
