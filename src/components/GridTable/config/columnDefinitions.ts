import { type ColDef } from 'ag-grid-community'
import { IRow } from '../mock/operations-data'

export const columnDefinitions: ColDef<IRow>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
	{ field: 'date', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
	{
		field: 'iconType',
		headerName: '',
		minWidth: 60,
		maxWidth: 60,
	},
	{ field: 'organization', headerName: 'Организация и счет', flex: 1 },
	{ field: 'counterparty', headerName: 'Контрагент', flex: 1 },
	{ field: 'nameOperation', headerName: 'Наименование операции', flex: 1 },
	{ field: 'caseAndDeal', headerName: 'Кейс и сделка', flex: 1 },
	{ field: 'article', headerName: 'Статья и подстатья', flex: 1 },
	{ field: 'amount', headerName: 'Сумма' },
	{
		field: 'checkbox',
		headerName: '',
		checkboxSelection: true,
		headerCheckboxSelection: true,
		minWidth: 50,
		maxWidth: 50,
	},
]
