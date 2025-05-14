import { CounterpartiesDTO, ICounterpartiesData } from '../table/config/counterpartiesTypes'

export const mapCounterparties = (counterpartiesBack: CounterpartiesDTO): ICounterpartiesData => {
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
