import { TSelectOption, TSelectOptionDirection, TSelectOptionParent } from '../ui/Select/types'

export interface IFormProps {
  labelBadge?: string
}

export type TFormAuth = {
  user_name: string
  password: string
}

export type TFormNewOperation = {
  orgs_list: TSelectOption[]
	accounts_list: (TSelectOption & { id_org: string })[]
	contragents_list: (TSelectOption & { inn: string })[]
	contragent_accounts_list: (TSelectOption & { id_contragent: string })[]
	deals_list: (TSelectOption & { id_case: string, id_org: string })[]
	cases_list: TSelectOption[]
	directions_list: TSelectOption[]
	articles_list: (TSelectOption & { id_direction: string, id_article_exp: string })[]
	rashods_list: TSelectOption[]
  article_exps_list: (TSelectOption & { direction: string })[]
	date: Date
	bank_id: string
  imported: boolean
	summ: string
	itemname: string
	comment: string
}

export type TFormUnloadOperations = {
  mainFilter?: 'selected' | 'all'
  uploadFormat?: 'XLSX' | 'JSON' | 'CSV'
  uploadData?: {
    showIdOperation: boolean
    showOrganization: boolean
    showCase: boolean
    showDateOperation: boolean
    showCounterparty: boolean
    showArticle: boolean
  }
  uploadHeader?: {
    showNumberOperations: boolean
    showNumberAmountArrivalOperations: boolean
    showAmountDifference: boolean
    showNumberAmountMovements: boolean
    showNumberAmountExpenseTransactions: boolean
    showUploadAuthor: boolean
  }
  saveSettings: boolean
}

export type TFormSettingsListOperations = {
  tableColumns?: {
    showIdOperation: boolean
    showOrganization: boolean
    showCase: boolean
    showDateOperation: boolean
    showCounterparty: boolean
    showArticle: boolean
  }
  amounts?: {
    showSelectedOperations: boolean
    showAmountArrivals: boolean
    showAmountDifference: boolean
    showAmountMovements: boolean
    showAmountExpenses: boolean
  }
  filterListOperations?:
    | 'notStoreFilterSettings'
    | 'saveSettingsUntilReboot'
    | 'saveSettingsBeforeChanging'
}

export type TFormProcessingOperation = TFormNewOperation & {
  initialAmount: string
  retainedAmount: string
  sumOperationDivision: string
  counterpartyDivision: string
  counterpartyAccountDivision: string
  caseDivision: string
  articleDivision: string
}

export type TFormUploadingOperations = {
  fileType?: '1cExchange' | 'YSet' | 'custom' | 'txt'
  files: Array<{
    file: File
  }>
}

export type TFormFilterOperationsMenu = {
  dateRange: string
  organization: string
  accounts: string
  counterparty: string
  direction: string
  article: string
  case: string
  rememberChoice: boolean
}

export type TFormOrganization = {
  shortName?: string
  inn?: string
  fullName?: string
  ogrn?: string
  legalAddress?: string
  employeesComment?: string
}

export type TFormContragent = {
  name: string
  inn: string
  fullName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: TSelectOption[] | any
}


export type TFormNewContragentAccount = {
  account_name: string
  contragent_bank: string
  contragent_bik: string
  contragent_rschet: string
  contragent_korschet: string
  account_type_name: string
  comment: string
}


export type TFormNewAccount = {
  account_name: string
	org_name?: string 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	orgs?: TSelectOption[] | any
  id_org?: TSelectOption[] | string
	account_type_name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	account_types?: TSelectOption[] | any
  id_account_type?: TSelectOption[] | string
	bank_name: string
  comment?: string
	rschet: string
	bik: string
}

export type TFormNewArticle = {
  article_name: string
  article_exps_list: TSelectOptionDirection[]
  direction: string
  directions_list: TSelectOption[]
  parent: string
  parents_list: TSelectOptionParent[]
  article_exp_name: string
  comment: string
}

export type TFormNewCase = {
  caseName: string
}

export type TFormEditCase = {
  caseName: string
}

export type TFormNewDeals = {
  shortName: string
  fullName: string
  case: string
  ourOrganization: string
  contragent: string
  nameAgreement: string
  dateAgreement: Date | null
  planTransaction: string
}

export type TFormFilterArticlesAndOrganizations = {
  date: string
  organization: string
  case: string
  counterparty: string
  rememberChoice: boolean
}

export type TFormCasesAndDeals = {
  date: string
  case: string
  rememberChoice: boolean
}
