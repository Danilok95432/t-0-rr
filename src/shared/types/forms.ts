export interface IFormProps {
  labelBadge?: string
}

export type TFormAuth = {
  user_name: string
  password: string
}

export type TFormNewOperation = {
  organization: string
  organizationAccount: string
  counterparty: string
  counterpartyAccount: string
  date: Date | null
  bankID: string
  sumOperation: string
  nameOperation: string
  employeesComment: string
  case: string
  direction: string
  typeExpense: string
  article: string
  payer: string
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
  fileType?: '1cExchange' | 'YSet' | 'custom'
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

export type TFormNewOrganization = {
  name: string
  inn: string
  fullName: string
  ogrn: string
  legalAddress: string
  employeesComment: string
}

export type TFormNewContragent = {
  name: string
  inn: string
  fullName: string
  type: string
}

export type TFormNewAccount = {
  name: string
  organization: string
  comment: string
  type: string
  bank: string
  paymentAccount: string
  bik: string
}

export type TFormNewArticle = {
  name: string
  direction: string
  parent: string
  type: string
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
