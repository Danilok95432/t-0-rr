import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { ICounterpartiesData } from './counterpartiesTypes'

import { CellLinkFullName } from '../cells/CellLinkFullName'
import { CellLinkShortName } from '../cells/CellLinkShortName'
import { CellLinkAccounts } from '../cells/CellLinkAccounts'
import { CellBadge } from '../cells/cellBadge/CellBadge'

export const counterpartiesDef: ColDef<ICounterpartiesData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  {
    field: 'shortName',
    headerName: 'Краткое название контрагента',
    cellRenderer: memo(CellLinkShortName),
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Полное официальное название контрагента',
    cellRenderer: memo(CellLinkFullName),
    flex: 2,
    tooltipField: 'fullName',
  },
  { field: 'type', headerName: 'Тип', flex: 1 },
  { field: 'inn', headerName: 'ИНН', flex: 1 },
  {
    field: 'accounts',
    headerName: 'Счета контрагента',
    cellRenderer: memo(CellLinkAccounts),
    valueFormatter: (params) => (!params.value.length ? 0 : params.value),
    flex: 2,
  },
  {
    field: 'reputation',
    headerName: 'Репутация',
    cellRenderer: memo(CellBadge),
    valueFormatter: (params) => (params.value === null ? {} : params.value),
    cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    maxWidth: 150,
  },
]
