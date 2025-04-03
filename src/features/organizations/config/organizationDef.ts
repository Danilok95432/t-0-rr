import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOrganizationsData } from '@/features/organizations/config/organizationsTypes'

import { CellBadge } from '../../table/cells/badgeCell/CellBadge'
import { CellLinkName } from '../../table/cells/CellLinkName'
import { CellLinkAccounts } from '../../table/cells/CellLinkAccounts'

export const organizationDef: ColDef<IOrganizationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название организации' },
	{
		field: 'fullName',
		headerName: 'Полное официальное название организации',
		cellRenderer: memo(CellLinkName),
		flex: 2,
	},
	{ field: 'type', headerName: 'Тип' },
	{ field: 'inn', headerName: 'ИНН' },
	{ field: 'ogrn', headerName: 'ОГРН' },
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
	},
]
