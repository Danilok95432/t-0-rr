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
  balanceAccounts: string
}

export type OrganizationDTO = {
  org_name: string
  org_name_full: string
  org_inn: string
  org_ogrn: string
  org_legal_address: string
  accounts: {
    id: string
    account_name: string
    bank_name: string
    bik: string
    rschet: string
    account_type_name: string
    comment: string
  }[]
  balance_prihod: string
  balance_rashod: string
  balance_diff: string
}

export interface IOrganization {
  shortName: string
  fullName: string
  inn: string
  ogrn: string
  legalAddress: string
  accounts: {
    id: string
    accountName: string
    bankName: string
    bik: string
    type: string
    account: string
    comment: string
  }[]
  coming: string
  expenses: string
  difference: string
}
