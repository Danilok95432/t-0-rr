import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IArticleArrivalData } from './articlesTypes'
import { CellLinkName } from '../cells/CellLinkName'

export const articleArrivalDef: ColDef<IArticleArrivalData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'level', headerName: 'Уровень', minWidth: 120, maxWidth: 120 },
	{ field: 'title', headerName: 'Название статьи прихода', cellRenderer: memo(CellLinkName) },
]
