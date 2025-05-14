export type CasesDTO = {
  id: string
  title: string
  orgs: [{ id: string; title: string }]
  deals: number
  operations: number
  balance: string
}

export interface ICasesData {
  id: string
  title: string
  orgs: [{ id: string; title: string }]
  deals: number
  operations: number
  balance: string
}
