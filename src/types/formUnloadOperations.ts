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
