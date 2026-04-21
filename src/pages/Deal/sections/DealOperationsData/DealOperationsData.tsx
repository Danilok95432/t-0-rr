import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { ProcessingOperation } from '@/features/operations/processingOperation'
import { operationsDealDef } from '@/features/operations/table/config/operationsDealDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
import { GridApi, RowClickedEvent, SortChangedEvent } from 'ag-grid-community'

import {
  GetAllOperationsArgs,
  useGetAllOperationsQuery,
} from '@/features/operations/api/operationsApi'
import type { OperationsData } from '@/features/operations/table/config/operationsTypes'
import { SortState } from '@/shared/types/sort'
import { useParams } from 'react-router'
import styles from './index.module.scss'
import { Loader } from '@/shared/ui/Loader'

const DealOperationData = () => {
  const { id } = useParams()
  const { buttonId, openModalById } = useModal()
  const { value } = useQuickFilter()

  const [sortState, setSortState] = useState<SortState>({
    order_by: 'date', // потому что itemdate по умолчанию sort: 'desc'
    order_dir: 1, // 1 = обратный порядок
  })

  const handleSortChanged = useCallback((event: SortChangedEvent) => {
    const columnState = event.api.getColumnState()

    const idColumn = columnState.find((col: { colId: string }) => col.colId === 'id')
    const itemdateColumn = columnState.find((col: { colId: string }) => col.colId === 'itemdate')
    const itemOrgColumn = columnState.find((col: { colId: string }) => col.colId === 'org_name')
    const itemContragentColumn = columnState.find(
      (col: { colId: string }) => col.colId === 'contragent_name',
    )
    const itemItemNameColumn = columnState.find(
      (col: { colId: string }) => col.colId === 'itemname',
    )
    const itemCaseColumn = columnState.find((col: { colId: string }) => col.colId === 'case_name')
    const itemArticleColumn = columnState.find(
      (col: { colId: string }) => col.colId === 'main_article_name',
    )
    const itemSummColumn = columnState.find(
      (col: { colId: string }) => col.colId === 'amount-column',
    )

    const idSort = idColumn?.sort ?? null
    const itemdateSort = itemdateColumn?.sort ?? null
    const itemOrgSort = itemOrgColumn?.sort ?? null
    const itemContragentSort = itemContragentColumn?.sort ?? null
    const itemItemNameSort = itemItemNameColumn?.sort ?? null
    const itemCaseSort = itemCaseColumn?.sort ?? null
    const itemArticleSort = itemArticleColumn?.sort ?? null
    const itemSummSort = itemSummColumn?.sort ?? null

    let newSortState: SortState = {
      order_by: null,
      order_dir: null,
    }

    if (idSort) {
      newSortState = {
        order_by: 'id',
        order_dir: idSort === 'asc' ? 0 : 1,
      }
    } else if (itemdateSort) {
      newSortState = {
        order_by: 'date',
        order_dir: itemdateSort === 'asc' ? 0 : 1,
      }
    } else if (itemOrgSort) {
      newSortState = {
        order_by: 'org',
        order_dir: itemOrgSort === 'asc' ? 0 : 1,
      }
    } else if (itemContragentSort) {
      newSortState = {
        order_by: 'contragent',
        order_dir: itemContragentSort === 'asc' ? 0 : 1,
      }
    } else if (itemItemNameSort) {
      newSortState = {
        order_by: 'itemname',
        order_dir: itemItemNameSort === 'asc' ? 0 : 1,
      }
    } else if (itemCaseSort) {
      newSortState = {
        order_by: 'case',
        order_dir: itemCaseSort === 'asc' ? 0 : 1,
      }
    } else if (itemArticleSort) {
      newSortState = {
        order_by: 'article',
        order_dir: itemArticleSort === 'asc' ? 0 : 1,
      }
    } else if (itemSummSort) {
      newSortState = {
        order_by: 'summ',
        order_dir: itemSummSort === 'asc' ? 0 : 1,
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSortState((prev: { order_by: any; order_dir: any }) => {
      if (prev.order_by === newSortState.order_by && prev.order_dir === newSortState.order_dir) {
        return prev
      }

      return newSortState
    })
  }, [])

  // Преобразуем фильтры в параметры запроса
  const getQueryParams = (): GetAllOperationsArgs => {
    const params: GetAllOperationsArgs = {
      searchtext: value || '',
    }

    if (sortState.order_by && sortState.order_dir !== null) {
      params.order_by = sortState.order_by
      params.order_dir = sortState.order_dir
    }

    params.deals = id

    return params
  }

  const gridApiRef = useRef<GridApi | null>(null)
  const [tableKey, setTableKey] = useState(0)

  // Сохраняем API сетки
  const onGridReady = useCallback((api: GridApi) => {
    gridApiRef.current = api
  }, [])

  // Получаем данные
  const { data, isLoading } = useGetAllOperationsQuery(getQueryParams())

  // При изменении данных - обновляем таблицу через API
  useEffect(() => {
    if (data?.cards && gridApiRef.current) {
      if (data?.cards && gridApiRef.current) {
        const newData = [...data.cards]
        gridApiRef.current.setGridOption('rowData', newData)
      }
      // Дополнительно принудительно обновляем ячейки
      gridApiRef.current.refreshCells({ force: true })
    }
  }, [data?.cards])

  useEffect(() => {
    if (data?.cards) {
      // Принудительно пересоздаем таблицу при получении новых данных
      setTableKey((prev) => prev + 1)
    }
  }, [data?.cards])

  const handleRowClick = useCallback(
    (params: RowClickedEvent<OperationsData>) => {
      const target = params.event?.target as HTMLElement | null

      if (target?.closest('.ag-selection-checkbox')) {
        return
      }

      if (!params.data?.id) return
      openModalById(`processing-${params.data.id}`)
    },
    [openModalById],
  )

  useEffect(() => {
    if (buttonId !== null) return
  }, [buttonId])

  const [, setSelectedIds] = useState<Array<string | number>>([])
  const handleSelectionChanged = useCallback((selectedIds: Array<string | number>) => {
    setSelectedIds(selectedIds)
  }, [])

  if (!data?.cards || isLoading) return <Loader />
  return (
    <ListLayout title='Операции сделки' noSearch wideRow className={styles.listLayout}>
      <div className={styles.table}>
        <GridTable
          rowData={data?.cards}
          columnDefinitions={operationsDealDef}
          quickFilterText={undefined}
          onGridReady={onGridReady}
          onRowClicked={handleRowClick}
          onSortChanged={handleSortChanged}
          onSelectionChanged={handleSelectionChanged}
          key={tableKey}
        />

        <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
          {buttonId?.split('-')[0] === 'processing' && (
            <Modal title='Обработка операции'>
              <ProcessingOperation
                id={
                  buttonId && buttonId.startsWith('processing-')
                    ? buttonId.split('processing-')[1]
                    : ''
                }
              />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </ListLayout>
  )
}

export default DealOperationData
