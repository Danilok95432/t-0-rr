import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { ICasesData } from '@/shared/types/casesData'
import { CellLinkName } from '../cells/CellLinkName'
import { CellBadge } from '../cells/badgeCell/CellBadge'

export const casesDef: ColDef<ICasesData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'fullName', headerName: 'Название кейса', cellRenderer: memo(CellLinkName) },
	{ field: 'organizations', headerName: 'Организации' },
	{ field: 'transactions', headerName: 'Сделок' },
	{ field: 'operations', headerName: 'Операций' },
	{
		field: 'balanceAccounts',
		headerName: 'Баланс кейса',
		cellRenderer: memo(CellBadge),
		valueFormatter: (params) => (params.value === null ? '' : params.value.value),
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
	},
]
