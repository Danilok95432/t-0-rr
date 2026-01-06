import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IOrganizationsData } from './organizationsTypes'

import { CellBadge } from '../cells/cellBadge/CellBadge'
import { CellLinkName } from '../cells/CellLinkName'
import { CellLinkAccounts } from '../cells/CellLinkAccounts'

export const organizationsDef: ColDef<IOrganizationsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
  { field: 'shortName', headerName: 'Краткое название организации' },
  {
    field: 'fullName',
    headerName: 'Полное официальное название организации',
    cellRenderer: memo(CellLinkName),
    tooltipField: 'fullName',
    flex: 2,
  },
  { field: 'type', headerName: 'Тип', maxWidth: 230 },
  { field: 'inn', headerName: 'ИНН', maxWidth: 120 },
  { field: 'ogrn', headerName: 'ОГРН', maxWidth: 140 },
  {
    field: 'accounts',
    headerName: 'Счета организации',
    cellRenderer: memo(CellLinkAccounts),
    valueFormatter: (params) => (!params.value.length ? [] : params.value),
    flex: 2,
  },
  {
    field: 'balanceAccounts',
    headerName: 'Баланс всех счетов',
    cellRenderer: memo(CellBadge),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
    maxWidth: 150,
  },
]
