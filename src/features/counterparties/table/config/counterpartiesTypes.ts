export interface ICounterpartiesData {
	id: string
	shortName: string
	fullName: string
	type: string
	inn: string
	accounts: string[]
	reputation: {
		status: string
		value: string
	}
}
