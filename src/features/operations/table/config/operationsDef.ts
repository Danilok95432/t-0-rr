import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOperationsData } from './operationsTypes'

import { CellIcon } from '../cells/CellIcon'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellModalButton } from '../cells/cellModalButton/CellModalButton'
import { CellBadge } from '../cells/cellBadge/CellBadge'

export const operationsDef: ColDef<IOperationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
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
	{ field: 'organization', headerName: 'Организация и счет' },
	{ field: 'counterparty', headerName: 'Контрагент' },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		cellRenderer: memo(CellModalButton),
		flex: 1,
	},
	{ field: 'caseAndDeal', headerName: 'Кейс и сделка' },
	{ field: 'article', headerName: 'Статья и подстатья' },
	{
		field: 'amount',
		headerName: 'Сумма',
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		cellRenderer: memo(CellBadge),
		minWidth: 130,
		maxWidth: 130,
	},
]
