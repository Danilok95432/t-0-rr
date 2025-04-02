import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOrganizationsData } from '@/shared/types/organizationsData'

import { CellBadge } from '../cells/badgeCell/CellBadge'
import { CellLinkName } from '../cells/CellLinkName'
import { CellLinkAccounts } from '../cells/CellLinkAccounts'

export const organizationDef: ColDef<IOrganizationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название организации', flex: 1 },
	{
		field: 'fullName',
		headerName: 'Полное официальное название организации',
		cellRenderer: memo(CellLinkName),
		flex: 2,
	},
	{ field: 'type', headerName: 'Тип', flex: 1 },
	{ field: 'inn', headerName: 'ИНН', flex: 1 },
	{ field: 'ogrn', headerName: 'ОГРН', flex: 1 },
	{
		field: 'accounts',
		headerName: 'Счета организации',
		cellRenderer: memo(CellLinkAccounts),
		valueFormatter: (params) => (!params.value.length ? [] : params.value),
		flex: 2,
	},
	{
		field: 'balanceAccounts',
		headerName: 'Баланс всех счетов',
		cellRenderer: memo(CellBadge),
		valueFormatter: (params) => (params.value === null ? '' : params.value.value),
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		flex: 1,
	},
]
