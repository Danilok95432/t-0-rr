import { IOrganizationsData, OrganizationsDTO } from '../table/config/organizationsTypes'

export const mapOrganizations = (orgDTO: OrganizationsDTO): IOrganizationsData => {
  return {
    id: orgDTO.id,
    shortName: orgDTO.org_name,
    fullName: orgDTO.org_name_full,
    type: orgDTO.org_type,
    inn: orgDTO.inn,
    ogrn: orgDTO.ogrn,
    accounts: orgDTO.accounts.map((account) => ({
      id: account.id,
      accountName: account.account_name,
    })),
    balanceAccounts: orgDTO.balance,
  }
}
