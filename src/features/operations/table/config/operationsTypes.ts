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
