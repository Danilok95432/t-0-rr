import { accountsDef } from '@/features/accounts/accountsTable/config/accountsDef'
import { IAccountsData } from '@/features/accounts/accountsTable/config/accountsTypes'
import { articleArrivalDef } from '@/features/articles/articlesTables/config/articleArrivalDef'
import { articleExpenseDef } from '@/features/articles/articlesTables/config/articleExpenseDef'
import {
	IArticleArrivalData,
	IArticleExpenseData,
} from '@/features/articles/articlesTables/config/articlesTypes'
import { casesDef } from '@/features/cases/casesTable/config/casesDef'
import { counterpartiesDef } from '@/features/counterparties/counterpartiesTable/config/counterpartiesDef'
import { ICounterpartiesData } from '@/features/counterparties/counterpartiesTable/config/counterpartiesTypes'
import { importsDef } from '@/features/imports/importsTable/configs/importsDef'
import { operationsDef } from '@/features/operations/operationsTable/config/operationsDef'
import { IOperationsData } from '@/features/operations/operationsTable/config/operationsTypes'
import { organizationDef } from '@/features/organizations/configTable/config/organizationDef'
import { IOrganizationsData } from '@/features/organizations/configTable/config/organizationsTypes'
import { transactionsDef } from '@/features/transactions/transactionTable/config/transactionsDef'
import { ITransactionsData } from '@/features/transactions/transactionTable/config/transactionsType'

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
	rowData?:
		| IOrganizationsData[]
		| IOperationsData[]
		| ICounterpartiesData[]
		| IAccountsData[]
		| IArticleArrivalData[]
		| IArticleExpenseData[]
		| ITransactionsData[]
	checkboxHidden?: boolean
}
