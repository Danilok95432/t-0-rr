import { accountsDef } from '@/features/accounts/table/config/accountsDef'
import { IAccountsData } from '@/features/accounts/table/config/accountsTypes'
import { articleArrivalDef } from '@/features/articles/table/config/articleArrivalDef'
import { articleExpenseDef } from '@/features/articles/table/config/articleExpenseDef'
import {
	IArticleArrivalData,
	IArticleExpenseData,
} from '@/features/articles/table/config/articlesTypes'
import { casesDef } from '@/features/cases/table/config/casesDef'
import { ICasesData } from '@/features/cases/table/config/casesTypes'
import { counterpartiesDef } from '@/features/counterparties/table/config/counterpartiesDef'
import { ICounterpartiesData } from '@/features/counterparties/table/config/counterpartiesTypes'
import { importDef } from '@/features/import/table/config/importDef'
import { IImportData } from '@/features/import/table/config/importTypes'
import { importsDef } from '@/features/imports/table/configs/importsDef'
import { IImportsData } from '@/features/imports/table/configs/importsTypes'
import { operationsDef } from '@/features/operations/table/config/operationsDef'
import { IOperationsData } from '@/features/operations/table/config/operationsTypes'
import { organizationDef } from '@/features/organizations/table/config/organizationDef'
import { IOrganizationsData } from '@/features/organizations/table/config/organizationsTypes'
import { transactionsDef } from '@/features/transactions/table/config/transactionsDef'
import { ITransactionsData } from '@/features/transactions/table/config/transactionsType'

export type TGridTableData = {
	columnDefinitions:
		| typeof operationsDef
		| typeof organizationDef
		| typeof counterpartiesDef
		| typeof accountsDef
		| typeof articleArrivalDef
		| typeof articleExpenseDef
		| typeof casesDef
		| typeof transactionsDef
		| typeof importsDef
		| typeof importDef
	rowData?:
		| IOrganizationsData[]
		| IOperationsData[]
		| ICounterpartiesData[]
		| IAccountsData[]
		| IArticleArrivalData[]
		| IArticleExpenseData[]
		| ITransactionsData[]
		| ICasesData[]
		| IImportsData[]
		| IImportData[]
	checkboxHidden?: boolean
	quickFilterText?: string
}
