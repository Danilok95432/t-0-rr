import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellIcon } from '../cells/CellIcon'

import styles from './import.module.scss'
import { IImportsOperation } from '@/features/imports/table/configs/importsTypes'

export const importDef: ColDef<IImportsOperation>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{
		field: 'id_direction',
		cellRenderer: memo(CellIcon),
		headerName: '',
		headerComponent: memo(CellIconHeader),
		minWidth: 60,
		maxWidth: 60,
		sortable: false,
	},
	{ field: 'contragent', headerName: 'Контрагент', tooltipField: 'contragent', maxWidth: 170, },
	{
		field: 'operation',
		headerName: 'Наименование операции',
		flex: 3,
		cellStyle: { color: 'var(--link)' },
		tooltipField: 'operation',
	},
	{ field: 'account', headerName: 'Определен счёт', tooltipField: 'account', maxWidth: 260, },
	{
		field: 'org',
		headerName: 'Организация',
		cellStyle: { color: 'var(--link)' },
		tooltipField: 'org',
		maxWidth: 260,
	},
	{
		colId: 'amount-column',
		field: 'sum',
		headerName: 'Сумма',
		headerClass: styles.amountHeader,
		maxWidth: 105,
		cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
	},
]
