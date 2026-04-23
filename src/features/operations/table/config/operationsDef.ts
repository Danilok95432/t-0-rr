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
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 80,
    maxWidth: 80,
    comparator: (valueA, valueB) => {
      // Преобразуем строковые ID в числа для корректного сравнения
      const numA = Number(valueA)
      const numB = Number(valueB)

      // Если оба значения валидные числа
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }

      // Если не числа, сравниваем как строки (fallback)
      return String(valueA).localeCompare(String(valueB))
    },
  },
  {
    field: 'itemdate',
    headerName: 'Дата',
    minWidth: 100,
    maxWidth: 100,
    sort: 'desc',
    valueFormatter: (params) => {
      if (!params.value) return ''

      try {
        const date = new Date(params.value)
        if (isNaN(date.getTime())) {
          const [year, month, day] = params.value.split('-')
          return `${day}.${month}.${year}`
        }

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
      } catch {
        return params.value
      }
    },
  },
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
    tooltipValueGetter: (params) => [params.data?.org_name, params.data?.account_name],
  },
  {
    field: 'contragent_name',
    headerName: 'Контрагент',
    tooltipField: 'contragent_name',
    maxWidth: 350,
  },
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
    colId: 'case_name',
    headerName: 'Кейс и сделка',
    cellRenderer: memo(CellCase),
    maxWidth: 250,
    valueGetter: (params) => ({
      case: params.data?.case_name,
      deal: params.data?.deal_name,
      idDeal: params.data?.id_deal,
    }),
    tooltipValueGetter: (params) => {
      const caseName = params.data?.case_name
      const dealName = params.data?.deal_name

      if (caseName == null || dealName == null) {
        return null
      }

      return `${caseName}\n${dealName}`
    },
  },
  {
    headerName: 'Статья и подстатья',
    maxWidth: 250,
    cellRenderer: CellArticle,
    valueGetter: (params) => ({
      article: params.data?.main_article_name,
      subArticle: params.data?.sub_article_name,
    }),
    field: 'main_article_name',
    tooltipField: 'main_article_name',
    tooltipValueGetter: (params) =>
      `${params.data?.main_article_name}\n${params.data?.sub_article_name}`,
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
      status:
        params.data?.id_direction === '2'
          ? 'negative'
          : params.data?.id_direction === '1'
            ? 'positive'
            : 'neutral',
      value: params.data?.id_direction === '2' ? `- ${params.data?.summ}` : `${params.data?.summ}`,
    }),
    cellStyle: { display: 'flex', justifyContent: 'end', alignItems: 'center' },
    maxWidth: 150,
    headerClass: styles.amountHeader,
  },
]
