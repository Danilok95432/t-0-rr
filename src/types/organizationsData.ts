export interface IOrganizationsData {
	id: string
	shortName: string
	fullName: {
		path: string
		label: string
	}
	type: string
	inn: string
	ogrn: string
	accounts: string[]
	balanceAccounts: {
		status: string
		value: string
	}
}
