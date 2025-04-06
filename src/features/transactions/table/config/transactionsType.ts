export interface ITransactionsData {
	id: string
	shortName: string
	fullName: string
	organization: string
	counterparty: string
	date: Date | null
	amount: string
	paid: string
	arrears: string
	case: string
}
