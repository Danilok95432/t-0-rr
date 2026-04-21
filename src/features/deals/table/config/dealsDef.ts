import { type ColDef } from 'ag-grid-community'
import { DealsDTO } from './dealsType'
import { CellLinkShortName } from '../cells/CellLinkShortName'
// import { CellLinkFullName } from '../cells/CellLinkFullName'

import styles from './deals.module.scss'

export const dealsDef: ColDef<DealsDTO>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'deal_short_name',
    headerName: 'Название сделки',
    cellRenderer: CellLinkShortName,
    tooltipField: 'deal_short_name',
    minWidth: 230,
  },
  // {
  //   field: 'deal_name',
  //   headerName: 'Полное наименование сделки',
  //   cellRenderer: CellLinkFullName,
  //   tooltipField: 'deal_name',
  // },
  { field: 'org', headerName: 'Организация', tooltipField: 'org', minWidth: 160 },
  { field: 'contragent', headerName: 'Контрагент', tooltipField: 'contragent' },
  { field: 'dogovor', headerName: 'Номер договора', tooltipField: 'dogovor', minWidth: 230 },
  { field: 'deal_date', headerName: 'Дата договора', maxWidth: 130 },
  {
    field: 'deal_summ',
    headerName: 'Сумма сделки',
    maxWidth: 190,
    colId: 'amount-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
  {
    field: 'deal_payed',
    headerName: 'Оплачено, сумма',
    maxWidth: 190,
    colId: 'paid-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
  {
    field: 'deal_dolg',
    headerName: 'Задолженность',
    maxWidth: 190,
    colId: 'appears-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
  {
    field: 'case',
    headerName: 'Кейс',
    tooltipField: 'case',
    maxWidth: 200,
    colId: 'case-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
]
