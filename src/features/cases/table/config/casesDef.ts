import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { ICasesData } from './casesTypes'

import { CellLinkName } from '../cells/CellLinkName'
import { CellLinkOrganizations } from '../cells/CellLinkOrganizations'
import { CellBadge } from '../cells/cellBadge/CellBadge'

import styles from './cases.module.scss'

export const casesDef: ColDef<ICasesData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
  {
    field: 'title',
    headerName: 'Название кейса',
    cellRenderer: memo(CellLinkName),
    flex: 2,
    tooltipField: 'title',
    maxWidth: 375
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
  { field: 'deals', headerName: 'Сделок', maxWidth: 235 },
  { field: 'operations', headerName: 'Операций', maxWidth: 160 },
  {
    field: 'balance',
    headerName: 'Баланс кейса',
    cellRenderer: memo(CellBadge),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
    colId: 'amount-column',
    headerClass: styles.amountHeader,
    maxWidth: 130
  },
]
