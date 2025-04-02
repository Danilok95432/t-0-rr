import { IOrganizationsData } from './organizationsData'
import { IOperationsData } from './operationsData'
import { columnDefOperations } from '../helpers/configTableOperations/columnDefOperations'
import { columnDefOrganization } from '@/helpers/configTableOrganizations/columnDefOrganization'
import { columnDefCounterparties } from '@/helpers/configTableCounterparties/columnDefCounterparties'
import { ICounterpartiesData } from './counterpartiesData'

export type TGridTableData = {
	rowData?: IOrganizationsData[] | IOperationsData[] | ICounterpartiesData[]
	columnDefinitions:
		| typeof columnDefOperations
		| typeof columnDefOrganization
		| typeof columnDefCounterparties
}
