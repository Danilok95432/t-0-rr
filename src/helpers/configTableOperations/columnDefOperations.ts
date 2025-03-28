import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOperationsData } from '@/types/operationsData'

import { iconCellRenderer } from './iconCellRender'
import { linkCellRender } from './linkCellRender'

export const columnDefOperations: ColDef<IOperationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
	{ field: 'date', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
	{
		field: 'iconType',
		cellRenderer: memo(iconCellRenderer),
		headerName: '',
		maxWidth: 60,
	},
	{ field: 'organization', headerName: 'Организация и счет', flex: 1 },
	{ field: 'counterparty', headerName: 'Контрагент', flex: 1 },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		cellRenderer: linkCellRender,
		flex: 1,
	},
	{ field: 'caseAndDeal', headerName: 'Кейс и сделка', flex: 1 },
	{ field: 'article', headerName: 'Статья и подстатья', flex: 1 },
	{
		field: 'amount',
		headerName: 'Сумма',
		cellStyle: (params) => {
			if (params.value[0] === '+') {
				return { color: '#c30707' }
			}
			if (params.value[0] === '-') {
				return { color: '#106f01' }
			}
			return { color: '#191c30' }
		},
		minWidth: 150,
		maxWidth: 200,
	},
]
