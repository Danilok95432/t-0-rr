import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IImportData } from './importTypes'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellIcon } from '../cells/CellIcon'

import styles from './import.module.scss'

export const importDef: ColDef<IImportData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{
		field: 'iconType',
		cellRenderer: memo(CellIcon),
		headerName: '',
		headerComponent: memo(CellIconHeader),
		minWidth: 60,
		maxWidth: 60,
		sortable: false,
	},
	{ field: 'counterparty', headerName: 'Контрагент', tooltipField: 'counterparty', maxWidth: 170, },
	{
		field: 'nameOperation',
		headerName: 'Наименование операции',
		flex: 3,
		cellStyle: { color: 'var(--link)' },
		tooltipField: 'nameOperation',
	},
	{ field: 'determinedAccount', headerName: 'Определен счёт', tooltipField: 'determinedAccount', maxWidth: 260, },
	{
		field: 'organization',
		headerName: 'Организация',
		cellStyle: { color: 'var(--link)' },
		tooltipField: 'organization',
		maxWidth: 260,
	},
	{
		colId: 'amount-column',
		field: 'amount',
		headerName: 'Сумма',
		headerClass: styles.amountHeader,
		maxWidth: 105,
		cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
	},
]
