import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IImportsData } from './importsTypes'
import { CellLinkDateTime } from '../cells/CellLinkDateTime'

export const importsDef: ColDef<IImportsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{
		field: 'dateAndTime',
		headerName: 'Дата и время импорта',
		cellRenderer: memo(CellLinkDateTime),
	},
	{ field: 'organization', headerName: 'Организация' },
	{ field: 'accounts', headerName: 'Счета' },
	{ field: 'file', headerName: 'Файл' },
	{ field: 'standard', headerName: 'Эталон', cellStyle: { color: 'var(--link)' } },
]
