import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOperationsData } from '@/features/operations/configs/operationsTypes'

import { CellIcon } from '../../table/cells/CellIcon'
import { ButtonCellRender } from '../../table/cells/buttonCell/buttonCellRender'
import { CellIconHeader } from '../../table/cells/CellIconHeader'
import { CellBalance } from '../../table/cells/CellBalance/CellBalance'

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
	{ field: 'organization', headerName: 'Организация и счет', flex: 1 },
	{ field: 'counterparty', headerName: 'Контрагент', flex: 1 },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		cellRenderer: memo(ButtonCellRender),
		valueFormatter: (params) => (params.value === null ? '' : params.value),
		flex: 1,
	},
	{ field: 'caseAndDeal', headerName: 'Кейс и сделка', flex: 1 },
	{ field: 'article', headerName: 'Статья и подстатья', flex: 1 },
	{
		field: 'amount',
		headerName: 'Сумма',
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		cellRenderer: memo(CellBalance),
		minWidth: 130,
		maxWidth: 130,
	},
]
