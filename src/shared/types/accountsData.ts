export interface IAccountsData {
	id: string
	type: string
	fullName: {
		path: string
		label: string
	}
	organization: string
	bank: string
	paymentAccount: string
	bic: string
	balanceAccounts: {
		status: string
		value: string
	}
}
