export interface ICasesData {
	id: string
	fullName: {
		path: string
		label: string
	}
	organizations: string
	transactions: string
	operations: string
	balanceAccounts: {
		status: string
		value: string
	}
}
