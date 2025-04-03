export type TFormNewTransaction = {
	shortName: string
	fullName: string
	case: string
	ourOrganization: string
	counterparty: string
	nameAgreement: string
	dateAgreement: Date | null
	planTransaction: string
}
