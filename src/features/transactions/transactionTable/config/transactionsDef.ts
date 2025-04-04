import { type ColDef } from 'ag-grid-community'
import { ITransactionsData } from './transactionsType'
import { CellLinkShortName } from '../cells/CellLinkShortName'
import { CellLinkFullName } from '../cells/CellLinkFullName'

export const transactionsDef: ColDef<ITransactionsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название сделки', cellRenderer: CellLinkShortName },
	{ field: 'fullName', headerName: 'Полное наименование сделки', cellRenderer: CellLinkFullName },
	{ field: 'organization', headerName: 'Организация' },
	{ field: 'counterparty', headerName: 'Контрагент' },
	{ field: 'date', headerName: 'Дата сделки' },
	{ field: 'amount', headerName: 'Сумма сделки' },
	{ field: 'paid', headerName: 'Оплачено, сумма' },
	{ field: 'arrears', headerName: 'Задолженность' },
	{ field: 'case', headerName: 'Кейс' },
]
