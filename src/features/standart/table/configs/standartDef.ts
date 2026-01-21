
import { type ColDef } from 'ag-grid-community'

import styles from './index.module.scss'
import { IStandartInfo } from '@/features/standarts/table/configs/standartsTypes'

export const standartInfoDef: ColDef<IStandartInfo>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'accountContragent',
    headerName: 'Счет контрагента',
    tooltipField: 'accountContragent',
    maxWidth: 320,
  },
  { field: 'operation', headerName: 'Наименование операции', tooltipField: 'operation', cellStyle: { color: 'var(--link)' } },
  {
    field: 'accountOrg',
    headerName: 'Счет организатора',
    tooltipField: 'accountOrg',
    maxWidth: 320,
  },
  {
    colId: 'amount-column',
    headerName: 'Сумма',
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
    maxWidth: 150,
    headerClass: styles.amountHeader,
  },
]
