export interface ICasesData {
  id: string
  name: string
  orgs: [{ id: string; title: string }]
  deals: number
  operations: number
  balance: string
}
