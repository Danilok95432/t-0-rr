export interface ICasesData {
	id: string
	name: string
	organizations: string[]
	transactions: string
	operations: string
	balanceCase: {
		status: string
		value: string
	}
}
