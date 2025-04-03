export interface IOperationsData {
	id: string
	date: string
	iconType: string
	organization: string
	counterparty: string
	nameOperation: {
		id: string
		name: string
	}
	caseAndDeal: string
	article: string
	amount: {
		status: string
		value: string
	}
}
