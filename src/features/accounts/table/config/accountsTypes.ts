export interface IAccountsData {
	id: string
	type: string
	fullName: string
	organization: string
	bank: string
	paymentAccount: string
	bic: string
	balanceAccounts: {
		status: string
		value: string
	}
}
