import { ContragentsDTO, IContragentsData } from '../table/config/contragentsTypes'

export const mapContragents = (counterpartiesBack: ContragentsDTO): IContragentsData => {
  return {
    id: counterpartiesBack.id,
    shortName: counterpartiesBack.short_name,
    fullName: counterpartiesBack.contragent_name,
    type: counterpartiesBack.contragent_type,
    inn: counterpartiesBack.inn,
    accounts: counterpartiesBack.accounts,
    reputation: counterpartiesBack.reputation,
  }
}
