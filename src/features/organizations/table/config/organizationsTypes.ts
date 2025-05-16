export type OrganizationsDTO = {
  id: string
  org_name: string
  org_name_full: string
  org_inn: string
  org_ogrn: string
  org_legal_address: string
}

export interface IOrganizationsData {
  id: string
  shortName: string
  fullName: string
  type: string
  inn: string
  ogrn: string
  accounts: string[]
  balanceAccounts: {
    status: string
    value: string
  }
}

/*
 org_name - наименование организации
- org_inn - ИНН организации
- org_ogrn - ОГРН 
- org_name_full - полное наименование 
- org_legal_address - юридический адрес организации
- comment - комментарий
- accounts - массив счетов организации
-- id - идентификатор счета
-- account_name - наименование счета
-- bank_name - наименование банка
-- bik - БИК
-- rschet - Расчетный счет
-- account_type_name - Тип счета
-- comment - комментарий
- balance_prihod - баланс организации (приход)
- balance_rashod - баланс организации (расход)
- balance_diff - баланс организации (разница)
 */
