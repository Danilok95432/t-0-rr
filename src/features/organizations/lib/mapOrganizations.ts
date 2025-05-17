import { IOrganizationsData, OrganizationsDTO } from '../table/config/organizationsTypes'

export const mapOrganizations = (orgBack: OrganizationsDTO): IOrganizationsData => {
  return {
    id: orgBack.id,
    shortName: orgBack.org_name,
    fullName: orgBack.org_name_full,
    type: orgBack.org_type,
    inn: orgBack.inn,
    ogrn: orgBack.ogrn,
    accounts: orgBack.accounts,
    balanceAccounts: {
      status: orgBack.balance,
      value: orgBack.balance,
    },
  }
}
