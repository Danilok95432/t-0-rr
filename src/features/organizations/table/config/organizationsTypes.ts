export type OrganizationsDTO = {
  id: string
  org_name: string
  org_name_full: string
  org_type: string
  inn: string
  ogrn: string
  accounts: [{ id: string; account_name: string }]
  balance: string
}

export interface IOrganizationsData {
  id: string
  shortName: string
  fullName: string
  type: string
  inn: string
  ogrn: string
  accounts: [{ id: string; account_name: string }]
  balanceAccounts: {
    status: string
    value: string
  }
}
