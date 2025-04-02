import { type ColDef } from 'ag-grid-community'
import { IOrganizationsData } from '@/types/organizationsData'

import { badgeCellRender } from './components/badgeCell/badgeCellRender'
import { linkNameCellRender } from './components/linkNameCellRender'
import { linkAccountsCellRender } from './components/linkAccountsCellRender'

export const columnDefOrganization: ColDef<IOrganizationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название организации', flex: 1 },
	{
		field: 'fullName',
		headerName: 'Полное официальное название организации',
		cellRenderer: linkNameCellRender,
		flex: 2,
	},
	{ field: 'type', headerName: 'Тип', flex: 1 },
	{ field: 'inn', headerName: 'ИНН', flex: 1 },
	{ field: 'ogrn', headerName: 'ОГРН', flex: 1 },
	{
		field: 'accounts',
		headerName: 'Счета организации',
		cellRenderer: linkAccountsCellRender,
		valueFormatter: (params) => (!params.value.length ? [] : params.value),
		flex: 2,
	},
	{
		field: 'balanceAccounts',
		headerName: 'Баланс всех счетов',
		cellRenderer: badgeCellRender,
		valueFormatter: (params) => (params.value === null ? '' : params.value.value),
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		flex: 1,
	},
]
