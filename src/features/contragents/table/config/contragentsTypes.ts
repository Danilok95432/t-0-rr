export type ContragentsDTO = {
  id: string
  short_name: string
  contragent_name: string
  contragent_type: string
  inn: string
  accounts_total: number
  accounts: {
    id: string
    contragentAccount: string
  }[]
  reputation: {
    status: string
    value: string
  }
}

export interface IContragentsData {
  id: string
  shortName: string
  fullName: string
  type: string
  inn: string
  accounts: {
    id: string
    contragentAccount: string
  }[]
  reputation: {
    status: string
    value: string
  }
}

export type ContragentDTO = {
  contragent_name: string
  contragent_name_full: string
  contragent_type_name: IContragentType[]
  inn: string
  accounts: IContragentAccountsData[]
}

export type IContragentData = {
  name: string
  fullName: string
  type: IContragentType[]
  inn: string
  accounts: IContragentAccountsData[]
}

export type IContragentType = {
  label: string
  value: string
}

export type IContragentAccountsData = {
  id: string
  account_name: string
  contragent_bank: string
  contragent_bik: string
  contragent_rschet: string
  contragent_korschet: string
  account_type_name: string
  comment: string
}
