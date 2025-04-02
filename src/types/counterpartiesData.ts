export interface ICounterpartiesData {
	id: string
	shortName: string
	fullName: {
		path: string
		label: string
	}
	type: string
	inn: string
	accounts: string[]
	reputation: {
		status: string
		value: string
	}
}
