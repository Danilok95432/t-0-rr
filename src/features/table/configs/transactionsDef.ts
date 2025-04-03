import { type ColDef } from 'ag-grid-community'
import { ITransactionsData } from '@/shared/types/transactionsData'

export const transactionsDef: ColDef<ITransactionsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название сделки' },
	{ field: 'fullName', headerName: 'Полное наименование сделки' },
	{ field: 'organization', headerName: 'Организация' },
	{ field: 'counterparty', headerName: 'Контрагент' },
	{ field: 'date', headerName: 'Дата сделки' },
	{ field: 'amount', headerName: 'Сумма сделки' },
	{ field: 'paid', headerName: 'Оплачено, сумма' },
	{ field: 'arrears', headerName: 'Задолженность' },
	{ field: 'case', headerName: 'Кейс' },
]
