import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { IAccountsData } from './accountsTypes'
import { CellLinkName } from '../cells/CellLinkName'
import { CellBadge } from '../cells/cellBadge/CellBadge'

export const accountsDef: ColDef<IAccountsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  { field: 'type', headerName: 'Тип счёта' },
  {
    field: 'fullName',
    headerName: 'Наименование счёта',
    cellRenderer: memo(CellLinkName),
    tooltipField: 'fullName',
  },
  { field: 'organization', headerName: 'Организация', flex: 2, tooltipField: 'organization' },
  { field: 'bank', headerName: 'Банк', flex: 2, tooltipField: 'bank' },
  { field: 'paymentAccount', headerName: 'Расчетный счет', tooltipField: 'paymentAccount' },
  { field: 'bic', headerName: 'БИК' },
  {
    field: 'balanceAccounts',
    headerName: 'Баланс счёта',
    cellRenderer: memo(CellBadge),
    valueFormatter: (params) => (params.value === null ? '' : params.value.value),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
  },
]
