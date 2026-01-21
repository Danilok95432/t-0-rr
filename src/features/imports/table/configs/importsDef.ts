
import { type ColDef } from 'ag-grid-community'
import { IImportsData } from './importsTypes'

import styles from './index.module.scss'

export const importsDef: ColDef<IImportsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'date',
    headerName: 'Дата импорта',
    maxWidth: 120
  },
  { field: 'org', headerName: 'Организация', tooltipField: 'org', maxWidth: 170 },
  {
    field: 'accounts',
    headerName: 'Счета',
    tooltipField: 'accounts',
    maxWidth: 370,
  },
  { field: 'file', headerName: 'Файл', tooltipField: 'file', cellClass: styles.file },
  { field: 'standard', headerName: 'Эталон', cellStyle: { color: 'var(--link)' }, maxWidth: 170, cellClass: 'standart-class' },
]
