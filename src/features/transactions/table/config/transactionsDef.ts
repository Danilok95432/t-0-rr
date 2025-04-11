import { type ColDef } from 'ag-grid-community'
import { ITransactionsData } from './transactionsType'
import { CellLinkShortName } from '../cells/CellLinkShortName'
import { CellLinkFullName } from '../cells/CellLinkFullName'

export const transactionsDef: ColDef<ITransactionsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{
		field: 'shortName',
		headerName: 'Краткое название сделки',
		cellRenderer: CellLinkShortName,
		tooltipField: 'shortName',
	},
	{
		field: 'fullName',
		headerName: 'Полное наименование сделки',
		cellRenderer: CellLinkFullName,
		tooltipField: 'fullName',
	},
	{ field: 'organization', headerName: 'Организация', tooltipField: 'organization' },
	{ field: 'counterparty', headerName: 'Контрагент', tooltipField: 'counterparty' },
	{ field: 'date', headerName: 'Дата сделки' },
	{ field: 'amount', headerName: 'Сумма сделки' },
	{ field: 'paid', headerName: 'Оплачено, сумма' },
	{ field: 'arrears', headerName: 'Задолженность' },
	{ field: 'case', headerName: 'Кейс', tooltipField: 'case' },
]
