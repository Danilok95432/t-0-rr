import { ContragentDTO, IContragentData } from '../table/config/contragentsTypes'

export const mapContragent = (contragentDTO: ContragentDTO): IContragentData => {
  return {
    name: contragentDTO.contragent_name,
    fullName: contragentDTO.contragent_name_full,
    type: contragentDTO.contragent_type_name,
    inn: contragentDTO.inn,
    accounts: contragentDTO.accounts.map((account) => ({
      id: account.id,
      accountName: account.account_name,
      bank: account.contragent_bank,
      bik: account.contragent_bik,
      account: account.contragent_rschet,
      corrAccount: account.contragent_korschet,
      comment: account.comment,
    })),
  }
}
