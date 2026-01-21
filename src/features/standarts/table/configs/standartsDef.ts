
import { type ColDef } from 'ag-grid-community'
import { IStandartData } from './standartsTypes'

import styles from './index.module.scss'

export const standartDef: ColDef<IStandartData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'dateTime',
    headerName: 'Дата и время импорта',
    cellStyle: { color: 'var(--link)' },
    maxWidth: 180
  },
  {
    field: 'accounts',
    headerName: 'Счета',
    tooltipField: 'accounts',
    maxWidth: 370,
  },
  { field: 'file', headerName: 'Файл', tooltipField: 'file', cellClass: styles.file },
  { field: 'employee', headerName: 'Сотрудник', maxWidth: 170, },
]
