import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOperationsData } from '@/types/operationsData'

import { iconCellRender } from './components/iconCellRender'
import { ButtonCellRender } from './components/buttonCell/buttonCellRender'
import iconCellHeader from './components/iconCellHeader'
import { sumCellRender } from './components/sumCell/sumCellRender'

export const columnDefOperations: ColDef<IOperationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
	{ field: 'date', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
	{
		field: 'iconType',
		cellRenderer: memo(iconCellRender),
		headerName: '',
		headerComponent: iconCellHeader,
		minWidth: 60,
		maxWidth: 60,
		sortable: false,
	},
	{ field: 'organization', headerName: 'Организация и счет', flex: 1 },
	{ field: 'counterparty', headerName: 'Контрагент', flex: 1 },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		cellRenderer: ButtonCellRender,
		valueFormatter: (params) => (params.value === null ? '' : params.value),
		flex: 1,
	},
	{ field: 'caseAndDeal', headerName: 'Кейс и сделка', flex: 1 },
	{ field: 'article', headerName: 'Статья и подстатья', flex: 1 },
	{
		field: 'amount',
		headerName: 'Сумма',
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		cellRenderer: sumCellRender,
		minWidth: 130,
		maxWidth: 130,
	},
]
