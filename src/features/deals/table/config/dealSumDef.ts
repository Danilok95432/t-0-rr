import { type ColDef } from 'ag-grid-community'
import { PaymentData } from './dealsType'

export const dealsSumDef: ColDef<PaymentData>[] = [
  { field: 'id', headerName: '№', minWidth: 60, maxWidth: 60 },
  { field: 'date', headerName: 'Дата', tooltipField: 'date', maxWidth: 100 },
  { field: 'name', headerName: 'Наименование', tooltipField: 'name' },
  { field: 'sum', headerName: 'Сумма', maxWidth: 110 },
  { headerName: 'Управление', maxWidth: 110 },
]
