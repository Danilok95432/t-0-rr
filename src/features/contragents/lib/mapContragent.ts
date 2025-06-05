import { ContragentDTO, IContragentData } from '../table/config/contragentsTypes'

export const mapContragent = (contragentDTO: ContragentDTO): IContragentData => {
  return {
    name: contragentDTO.contragent_name,
    fullName: contragentDTO.contragent_name_full,
    type: contragentDTO.contragent_type_name,
    inn: contragentDTO.inn,
    accounts: contragentDTO.accounts.map((account) => ({
      id: account.id,
      account_name: account.account_name,
      contragent_bank: account.contragent_bank,
      contragent_bik: account.contragent_bik,
      contragent_rschet: account.contragent_rschet,
      contragent_korschet: account.contragent_korschet,
      account_type_name: account.account_type_name,
      comment: account.comment,
    })),
  }
}
