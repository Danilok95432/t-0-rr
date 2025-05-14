import { CasesDTO, ICasesData } from '../table/config/casesTypes'

export const mapCases = (casesBack: CasesDTO): ICasesData => {
  return {
    id: casesBack.id,
    title: casesBack.title,
    orgs: casesBack.orgs,
    deals: casesBack.deals,
    operations: casesBack.operations,
    balance: casesBack.balance,
  }
}
