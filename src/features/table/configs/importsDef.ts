import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IImportsData } from '@/shared/types/importsData'

export const importsDef: ColDef<IImportsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'dateAndTime', headerName: 'Дата и время импорта' },
	{ field: 'organization', headerName: 'Организация' },
	{ field: 'accounts', headerName: 'Счета' },
	{ field: 'file', headerName: 'Файл' },
	{ field: 'standard', headerName: 'Эталон' },
]
