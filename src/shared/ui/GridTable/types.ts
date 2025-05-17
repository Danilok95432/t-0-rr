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
import { contragentsDef } from '@/features/contragents/table/config/contragentsDef'
import { IContragentsData } from '@/features/contragents/table/config/contragentsTypes'
import { importDef } from '@/features/import/table/config/importDef'
import { IImportData } from '@/features/import/table/config/importTypes'
import { importsDef } from '@/features/imports/table/configs/importsDef'
import { IImportsData } from '@/features/imports/table/configs/importsTypes'
import { operationsDef } from '@/features/operations/table/config/operationsDef'
import { IOperationsData } from '@/features/operations/table/config/operationsTypes'
import { organizationsDef } from '@/features/organizations/table/config/organizatiosDef'
import { IOrganizationsData } from '@/features/organizations/table/config/organizationsTypes'
import { dealsDef } from '@/features/deals/table/config/dealsDef'
import { IDealsData } from '@/features/deals/table/config/dealsType'

export type TGridTableData = {
  columnDefinitions:
    | typeof operationsDef
    | typeof organizationsDef
    | typeof contragentsDef
    | typeof accountsDef
    | typeof articleArrivalDef
    | typeof articleExpenseDef
    | typeof casesDef
    | typeof dealsDef
    | typeof importsDef
    | typeof importDef
  rowData?:
    | IOrganizationsData[]
    | IOperationsData[]
    | IContragentsData[]
    | IAccountsData[]
    | IArticleArrivalData[]
    | IArticleExpenseData[]
    | IDealsData[]
    | ICasesData[]
    | IImportsData[]
    | IImportData[]
  checkboxHidden?: boolean
  quickFilterText?: string
}
