import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IAccountsData } from '@/shared/types/accountsData'
import { CellBadge } from '../cells/badgeCell/CellBadge'
import { CellLinkName } from '../cells/CellLinkName'

export const accountsDef: ColDef<IAccountsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'type', headerName: 'Тип' },
	{
		field: 'fullName',
		headerName: 'Наименование счёта',
		cellRenderer: memo(CellLinkName),
	},
	{ field: 'organization', headerName: 'Организация', flex: 2 },
	{ field: 'bank', headerName: 'Банк', flex: 2 },
	{ field: 'paymentAccount', headerName: 'Расчетный счет' },
	{ field: 'bic', headerName: 'БИК' },
	{
		field: 'balanceAccounts',
		headerName: 'Баланс счёта',
		cellRenderer: memo(CellBadge),
		valueFormatter: (params) => (params.value === null ? '' : params.value.value),
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
	},
]
