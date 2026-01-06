export interface IOperationsData {
  id: string
  date: string
  iconType: string
  organization: {
    name: string
    account: string
  }
  counterparty: string
  nameOperation: string
  caseAndDeal: {
    case: string
    deal: string
  }
  article: {
    article: string
    subArticle: string
  }
  amount: {
    status: string
    value: string
  }
}

export interface OperationsData {
  id: string
  itemdate: string
  id_direction: string
  org_name: string
  account_name: string
  contragent_name: string
  itemname: string
  case_name: string
  deal_name: string
  main_article_name: string
  sub_article_name: string
  summ: string
}

export interface OperationsResponse {
  cards: OperationsData[]
  summ_diff: number
  summ_inc: number
  summ_out: number
}

export interface OperationsSummary {
  summ_diff: number
  summ_inc: number
  summ_out: number
}