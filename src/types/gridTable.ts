import { IOrganizationsData } from './organizationsData'
import { IOperationsData } from './operationsData'
import { columnDefOperations } from '../helpers/configTableOperations/columnDefOperations'
import { columnDefOrganization } from '@/helpers/configTableOrganizations/columnDefOrganization'

export type TGridTableData = {
	rowData?: IOrganizationsData[] | IOperationsData[]
	columnDefinitions: typeof columnDefOperations | typeof columnDefOrganization
}
