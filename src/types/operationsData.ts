export interface IOperationsData {
	id: string
	date: string
	iconType: string
	organization: string
	counterparty: string
	nameOperation: INameOperation
	caseAndDeal: string
	article: string
	amount: string
}

interface INameOperation {
	id: string
	name: string
}
