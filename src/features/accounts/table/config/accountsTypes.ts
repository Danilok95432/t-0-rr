import { TSelectOption } from "@/shared/ui/Select/types"

export interface IAccountsData {
	id: string
	account_type_name: string
	account_name: string
	balance: string
	org_name: string
	bank_name: string
	rschet: string
	bik: string
}

export interface IAccountsResponse {
	accounts: IAccountsData[]
}

export interface IAccountInfo {
	account_name: string
	org_name: string 
	orgs: TSelectOption[]
	account_type_name: string
	account_types: TSelectOption[]
	comment: string
	bank_name: string
	rschet: string
	bik: string
	prihod: string
	rashod: string
	balance: string
	income_org_transfers: string
	expence_org_transfers: string
}
