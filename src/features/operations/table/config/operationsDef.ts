import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOperationsData } from './operationsTypes'

import { CellIcon } from '../cells/CellIcon'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellModalButton } from '../cells/cellModalButton/CellModalButton'
import { CellBadge } from '../cells/cellBadge/CellBadge'
import { CellCase } from '../cells/cellCase/CellCase'
import { CellArticle } from '../cells/cellArticle/CellArticle'

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
	{ field: 'organization', headerName: 'Организация и счет', tooltipField: 'organization' },
	{ field: 'counterparty', headerName: 'Контрагент', tooltipField: 'counterparty' },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		cellRenderer: memo(CellModalButton),
		minWidth: 200,
		flex: 1,
		autoHeight: false,
		tooltipField: 'nameOperation',
	},
	{
		field: 'caseAndDeal',
		headerName: 'Кейс и сделка',
		cellRenderer: memo(CellCase),
	},
	{
		field: 'article',
		headerName: 'Статья и подстатья',
		cellRenderer: CellArticle,
		// filter: true,
		// valueGetter: (params) => params.data?.article,
		// filterValueGetter: (value) => value.data?.article.article,
		// filterParams: {
		// 	buttons: ['reset'],
		// },
	},
	{
		field: 'amount',
		headerName: 'Сумма',
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		cellRenderer: memo(CellBadge),
		minWidth: 130,
		maxWidth: 130,
	},
]

