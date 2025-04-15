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
  { field: 'organization', headerName: 'Организация', tooltipField: 'organization' },
  {
    field: 'accounts',
    headerName: 'Счета',
    tooltipField: 'accounts',
  },
  { field: 'file', headerName: 'Файл', tooltipField: 'file' },
  { field: 'standard', headerName: 'Эталон', cellStyle: { color: 'var(--link)' } },
]
