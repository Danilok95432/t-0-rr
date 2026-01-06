import { memo } from 'react'
import { type ColDef } from 'ag-grid-community'
import { OperationsData } from './operationsTypes'

import { CellIcon } from '../cells/CellIcon'
import { CellIconHeader } from '../cells/CellIconHeader'
import { CellModalButton } from '../cells/cellModalButton/CellModalButton'
import { CellBadge } from '../cells/cellBadge/CellBadge'
import { CellCase } from '../cells/cellCase/CellCase'
import { CellArticle } from '../cells/cellArticle/CellArticle'
import { CellOrg } from '../cells/cellOrg/cellOrg'

import styles from './operations.module.scss'

export const operationsDef: ColDef<OperationsData>[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
  { field: 'itemdate', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
  {
    field: 'id_direction',
    cellRenderer: memo(CellIcon),
    headerName: '',
    headerComponent: memo(CellIconHeader),
    minWidth: 60,
    maxWidth: 60,
    sortable: false,
  },
  {
    field: 'org_name',
    headerName: 'Организация и счет',
    cellRenderer: CellOrg,
    tooltipField: 'org_name',
    maxWidth: 180,
    tooltipValueGetter: (params) => [
      params.data?.org_name,
      params.data?.account_name,
    ],
  },
  { field: 'contragent_name', headerName: 'Контрагент', tooltipField: 'contragent_name', maxWidth: 350 },
  {
    field: 'itemname',
    headerName: 'Наименование операции',
    cellRenderer: memo(CellModalButton),
    minWidth: 200,
    flex: 1,
    autoHeight: false,
    tooltipField: 'itemname',
  },
  {
    headerName: 'Кейс и сделка',
    cellRenderer: memo(CellCase),
    maxWidth: 250,
    valueGetter: (params) => ({
      case: params.data?.case_name,
      deal: params.data?.deal_name
    }),
    tooltipValueGetter: (params) => 
      `${params.data?.case_name}\n${params.data?.deal_name}`
  },
  {
    headerName: 'Статья и подстатья',
    maxWidth: 250,
    cellRenderer: CellArticle,
    valueGetter: (params) => ({
      case: params.data?.main_article_name,
      deal: params.data?.sub_article_name
    }),
    tooltipValueGetter: (params) => 
      `${params.data?.case_name}\n${params.data?.deal_name}`
    // filter: true,
    // valueGetter: (params) => params.data?.article,
    // filterValueGetter: (value) => value.data?.article.article,
    // filterParams: {
    // 	buttons: ['reset'],
    // },
  },
  {
    colId: 'amount-column',
    headerName: 'Сумма',
    cellRenderer: memo(CellBadge),
    valueGetter: (params) => ({
      status: params.data?.id_direction === '1' ? 'negative' : (params.data?.id_direction === '2' ? 'positive' : 'neutral'),
      value: params.data?.summ
    }),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
    maxWidth: 150,
    headerClass: styles.amountHeader,
  },
]

