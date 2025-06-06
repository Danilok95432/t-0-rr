import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IArticleExpenseData } from './articlesTypes'
import { CellLinkName } from '../cells/CellLinkName'

export const articleExpenseDef: ColDef<IArticleExpenseData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'level', headerName: 'Уровень' },
	{ field: 'title', headerName: 'Название статьи расхода', cellRenderer: memo(CellLinkName) },
	{ field: 'type', headerName: 'Тип расходов' },
]
