import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { ICasesData } from './casesTypes'

import { CellLinkName } from '../cells/CellLinkName'
import { CellLinkOrganizations } from '../cells/CellLinkOrganizations'
import { CellBadge } from '../cells/cellBadge/CellBadge'

export const casesDef: ColDef<ICasesData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
  {
    field: 'name',
    headerName: 'Название кейса',
    cellRenderer: memo(CellLinkName),
    flex: 2,
    tooltipField: 'name',
  },
  {
    field: 'orgs',
    headerName: 'Организации',
    cellRenderer: memo(CellLinkOrganizations),
    flex: 2,
    tooltipValueGetter: (params) => {
      return params.value.map((el: Record<string, string>) => el.title).join('')
    },
    getQuickFilterText: (params) => {
      return params.data.orgs.map((el: Record<string, string>) => el.title).join('')
    },
  },
  { field: 'deals', headerName: 'Сделок' },
  { field: 'operations', headerName: 'Операций' },
  {
    field: 'balance',
    headerName: 'Баланс кейса',
    cellRenderer: memo(CellBadge),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
]
