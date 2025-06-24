import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IAccountsData } from './accountsTypes'
import { CellLinkName } from '../cells/CellLinkName'
import { CellBadge } from '../cells/cellBadge/CellBadge'

export const accountsDef: ColDef<IAccountsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  { field: 'account_type_name', headerName: 'Тип счёта' },
  {
    field: 'account_name',
    headerName: 'Наименование счёта',
    cellRenderer: memo(CellLinkName),
    tooltipField: 'account_name',
  },
  { field: 'org_name', headerName: 'Организация', flex: 2, tooltipField: 'org_name' },
  { field: 'bank_name', headerName: 'Банк', flex: 2, tooltipField: 'bank_name' },
  { field: 'rschet', headerName: 'Расчетный счет', tooltipField: 'rschet' },
  { field: 'bik', headerName: 'БИК' },
  {
    field: 'balance',
    headerName: 'Баланс счёта',
    cellRenderer: memo(CellBadge),
    valueFormatter: (params) => (params.value === null ? '' : params.value.value),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
]
