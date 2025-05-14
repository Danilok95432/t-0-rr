export type CounterpartiesDTO = {
  id: string
  short_name: string
  contragent_name: string
  contragent_type: string
  inn: string
  accounts_total: number
  accounts: [
    {
      id: string
      contragent_rschet: string
    }
  ]
  reputation: {
    status: string
    value: string
  }
}

export interface ICounterpartiesData {
  id: string
  shortName: string
  fullName: string
  type: string
  inn: string
  accounts: [{ id: string; contragent_rschet: string }]
  reputation: {
    status: string
    value: string
  }
}
