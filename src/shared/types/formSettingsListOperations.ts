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
