export interface IOperationsData {
	id: string
	date: string
	iconType: string
	organization: string
	counterparty: string
	nameOperation: string
	caseAndDeal: {
		case: string
		deal: string
	}
	article: {
		article: string
		subArticle: string
	}
	amount: {
		status: string
		value: string
	}
}
