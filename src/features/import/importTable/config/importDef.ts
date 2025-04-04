import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IImportData } from './importTypes'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellIcon } from '../cells/CellIcon'

export const importDef: ColDef<IImportData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'date', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
	{
		field: 'iconType',
		cellRenderer: memo(CellIcon),
		headerName: '',
		headerComponent: memo(CellIconHeader),
		minWidth: 60,
		maxWidth: 60,
		sortable: false,
	},
	{
		field: 'amount',
		headerName: 'Сумма',
	},
	{ field: 'counterparty', headerName: 'Контрагент' },
	{ field: 'nameOperation', headerName: 'Наименование операции', flex: 3 },
	{ field: 'determinedAccount', headerName: 'Определен счёт' },
	{ field: 'organization', headerName: 'Организация' },
]
