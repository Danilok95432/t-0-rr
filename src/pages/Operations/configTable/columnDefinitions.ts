import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'

import { IRow } from '@/types/row'

import { iconCellRenderer } from './iconCellRender'
import { linkCellRender } from './linkCellRender'

export const columnDefinitions: ColDef<IRow>[] = [
	{ field: 'id', headerName: 'ID', width: 80, maxWidth: 80 },
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
	{ field: 'amount', headerName: 'Сумма', minWidth: 150, maxWidth: 200 },
]
