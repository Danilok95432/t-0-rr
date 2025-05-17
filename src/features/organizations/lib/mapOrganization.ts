import { IOrganization, OrganizationDTO } from '../table/config/organizationsTypes'

export const mapOrganization = (orgDTO: OrganizationDTO): IOrganization => {
  return {
    shortName: orgDTO.org_name,
    fullName: orgDTO.org_name_full,
    inn: orgDTO.org_inn,
    ogrn: orgDTO.org_ogrn,
    legalAddress: orgDTO.org_legal_address,
    accounts: orgDTO.accounts.map((account) => ({
      id: account.id,
      accountName: account.account_name,
      bankName: account.bank_name,
      bik: account.bik,
      type: account.account_type_name,
      account: account.account_name,
      comment: account.comment,
    })),
    coming: orgDTO.balance_prihod,
    expenses: orgDTO.balance_rashod,
    difference: orgDTO.balance_diff,
  }
}
