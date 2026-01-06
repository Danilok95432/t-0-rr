import { type ColDef } from 'ag-grid-community'
import { IDealsData } from './dealsType'
import { CellLinkShortName } from '../cells/CellLinkShortName'
import { CellLinkFullName } from '../cells/CellLinkFullName'

import styles from './deals.module.scss'

export const dealsDef: ColDef<IDealsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'shortName',
    headerName: 'Краткое название сделки',
    cellRenderer: CellLinkShortName,
    tooltipField: 'shortName',
    maxWidth: 180,
  },
  {
    field: 'fullName',
    headerName: 'Полное наименование сделки',
    cellRenderer: CellLinkFullName,
    tooltipField: 'fullName',
  },
  { field: 'organization', headerName: 'Организация', tooltipField: 'organization', maxWidth: 140 },
  { field: 'contragent', headerName: 'Контрагент', tooltipField: 'contragent' },
  { field: 'date', headerName: 'Дата сделки', maxWidth: 110 },
  {
    field: 'amount',
    headerName: 'Сумма сделки',
    maxWidth: 190,
    colId: 'amount-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
  {
    field: 'paid',
    headerName: 'Оплачено, сумма',
    maxWidth: 190,
    colId: 'paid-column',
    headerClass: styles.amountHeader,
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
  {
    field: 'arrears',
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
