import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { FilterOperations } from '@/features/operations/filterOperations'
import { NewOperation } from '@/features/operations/newOperation'
import { UnloadingOperations } from '@/features/operations/unloadingOperations'
import { UploadingOperations } from '@/features/operations/uploadingOperations'
import { SettingsListOperations } from '@/features/operations/settingsListOperations'
import { ProcessingOperation } from '@/features/operations/processingOperation'
import { operationsDef } from '@/features/operations/table/config/operationsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { Modal } from '@/shared/ui/Modal'
import { GridApi, RowClickedEvent, SortChangedEvent } from 'ag-grid-community'

import {
  GetAllOperationsArgs,
  useGetAllOperationsQuery,
} from '@/features/operations/api/operationsApi'
import type { OperationsData } from '@/features/operations/table/config/operationsTypes'
import { LIMIT_TABLE_DATA } from '@/shared/lib/const'
import {
  OperationsFiltersProvider,
  useOperationsFilters,
} from '@/features/filtersMenu/context/operationsFilterContext'
import { SortState } from '@/shared/types/sort'
import { GroupProccesing } from '@/features/operations/group-proccesing'

const LIMIT = LIMIT_TABLE_DATA

const OperationsContent = () => {
  const { buttonId, openModalById } = useModal()
  const { filters } = useOperationsFilters()

  const [step, setStep] = useState(0)
  const [operations, setOperations] = useState<OperationsData[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)
  const isInitialMount = useRef(true)

  const [sortState, setSortState] = useState<SortState>({
    order_by: 'date', // потому что itemdate по умолчанию sort: 'desc'
    order_dir: 1, // 1 = обратный порядок
  })

  const extractValues = (value: unknown): string[] => {
    if (!value) return []

    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string') return item
          if (item && typeof item === 'object' && 'value' in item) {
            return item.value as string
          }
          return ''
        })
        .filter(Boolean)
    }

    if (value && typeof value === 'object' && 'value' in value) {
      return [value.value as string]
    }

    if (typeof value === 'string') {
      return [value]
    }

    if (value instanceof Date) {
      const isoString = value.toISOString().split('T')[0]
      return [isoString]
    }

    return []
  }

  const dateToISOString = (date: Date | string | undefined): string => {
    if (!date) return ''

    try {
      const dateObj = date instanceof Date ? date : new Date(date)

      if (isNaN(dateObj.getTime())) return ''

      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    } catch (error) {
      console.error('Error converting date to ISO:', error)
      return ''
    }
  }

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
      searchtext: '',
      step,
      limit: LIMIT,
    }

    if (sortState.order_by && sortState.order_dir !== null) {
      params.order_by = sortState.order_by
      params.order_dir = sortState.order_dir
    }

    if (filters) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rememberChoice, ...filterParams } = filters

      if (filterParams.dateFrom) {
        const dateFromValue = dateToISOString(filterParams.dateFrom)
        if (dateFromValue) {
          params.dateFrom = dateFromValue
        }
      }

      if (filterParams.dateTo) {
        const dateToValue = dateToISOString(filterParams.dateTo)
        if (dateToValue) {
          params.dateTo = dateToValue
        }
      }

      if (filterParams.org) {
        const orgValues = extractValues(filterParams.org)
        if (orgValues.length > 0) {
          params.org = orgValues.join(',')
        }
      }

      if (filterParams.account) {
        const accountValues = extractValues(filterParams.account)
        if (accountValues.length > 0) {
          params.account = accountValues.join(',')
        }
      }

      if (filterParams.contragent) {
        const contragentValues = extractValues(filterParams.contragent)
        if (contragentValues.length > 0) {
          params.contragent = contragentValues.join(',')
        }
      }

      if (filterParams.directions) {
        const directionsValues = extractValues(filterParams.directions)
        if (directionsValues.length > 0) {
          params.directions = directionsValues.join(',')
        }
      }

      if (filterParams.article) {
        const articleValue = extractValues(filterParams.article)[0]
        if (articleValue) {
          params.article = articleValue
        }
      }

      if (filterParams.cases) {
        const casesValue = extractValues(filterParams.cases)[0]
        if (casesValue) {
          params.cases = casesValue
        }
      }

      if (filterParams.deals) {
        const dealsValue = extractValues(filterParams.deals)[0]
        if (dealsValue) {
          params.deals = dealsValue
        }
      }
    }

    return params
  }

  const { data, isFetching, isLoading } = useGetAllOperationsQuery(getQueryParams())

  // Мемоизируем данные для таблицы
  const pageData = useMemo(() => {
    return data?.cards ?? []
  }, [data])

  // Мемоизируем сумму для totalInfo
  const totalInfoData = useMemo(
    () => [
      {
        name: 'Всего операций',
        value: `${data?.count ?? 0}`,
      },
      {
        name: 'Перемещения',
        value: ``,
      },
      {
        name: 'Приход',
        value: `${data?.summ_inc ?? 0}`,
      },
      {
        name: 'Расход',
        value: `${data?.summ_out ?? 0}`,
      },
      {
        name: 'Разница',
        value: `${data?.summ_diff ?? 0}`,
      },
    ],
    [data],
  )

  // ------------ Скролл настройки ------------
  const gridApiRef = useRef<GridApi | null>(null)

  const scrollStateRef = useRef({
    rowIndex: 0,
    offset: 0,
  })

  const handleGridReady = (api: GridApi) => {
    gridApiRef.current = api
  }

  const saveScrollPosition = () => {
    const api = gridApiRef.current
    if (!api) return

    const firstRow = api.getFirstDisplayedRowIndex()
    const rowNode = api.getDisplayedRowAtIndex(firstRow)

    scrollStateRef.current = {
      rowIndex: firstRow,
      offset: rowNode?.rowTop ?? 0,
    }
  }

  const restoreScrollPosition = () => {
    const api = gridApiRef.current
    if (!api) return

    requestAnimationFrame(() => {
      api.ensureIndexVisible(scrollStateRef.current.rowIndex, 'top')
    })
  }

  const handleScrollLoad = useCallback(() => {
    if (isFetching || isLoading || !hasMore) return

    const api = gridApiRef.current
    if (!api) return

    const lastRow = api.getLastDisplayedRowIndex()
    const totalRows = operations.length

    if (lastRow >= totalRows - 5) {
      saveScrollPosition()
      setStep((prev) => prev + LIMIT)
    }
  }, [isFetching, isLoading, hasMore, operations.length])

  useEffect(() => {
    if (operations.length === 0) return
    restoreScrollPosition()
  }, [operations.length])

  const handleRowClick = useCallback(
    (params: RowClickedEvent<OperationsData>) => {
      const target = params.event?.target as HTMLElement | null

      if (target?.closest('.ag-selection-checkbox')) {
        return
      }
      if (target?.closest('.ag-cell[col-id="case_name"]')) {
        return
      }

      if (!params.data?.id) return
      saveScrollPosition()
      openModalById(`processing-${params.data.id}`)
    },
    [openModalById],
  )

  useEffect(() => {
    if (buttonId !== null) return
    restoreScrollPosition()
  }, [buttonId])

  // Сброс состояния при изменении поиска или фильтров
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setStep(0)
    setOperations([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [filters, sortState])

  // Обновление списка операций при изменении данных или шага
  useEffect(() => {
    if (!pageData.length) {
      if (step === 0) {
        setOperations([])
      }
      return
    }

    setOperations((prev) => {
      if (step === 0) {
        return pageData
      }
      const existingIds = new Set(prev.map((op) => op.id))
      const newItems = pageData.filter((op) => !existingIds.has(op.id))
      return [...prev, ...newItems]
    })

    if (pageData.length < LIMIT) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }, [pageData, step]) // Убрана operations из зависимостей

  // Инициализация данных при первом рендере или изменении фильтров
  useEffect(() => {
    if (pageData.length > 0 && operations.length === 0 && step === 0) {
      setOperations(pageData)
      setHasMore(pageData.length >= LIMIT)
    }
  }, [pageData, operations.length, step])

  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([])
  const handleSelectionChanged = useCallback((selectedIds: Array<string | number>) => {
    setSelectedIds(selectedIds)
  }, [])

  return (
    <ListLayout title='Операции' noSearch wideRow totalInfoData={totalInfoData}>
      <FiltersMenu>
        <FilterOperations />
      </FiltersMenu>

      <GridTable
        rowData={operations}
        columnDefinitions={operationsDef}
        onRowClicked={handleRowClick}
        onGridReady={handleGridReady}
        onScrollEnd={handleScrollLoad}
        onSortChanged={handleSortChanged}
        onSelectionChanged={handleSelectionChanged}
        isRightCheckboxes
      />

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новая операция'>
            <NewOperation />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {selectedIds.length > 0 && (
          <GroupProccesing elements={selectedIds} />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'import' && (
          <Modal title='Загрузка (импорт) операций'>
            <UploadingOperations labelBadge='В этой форме производится массовая загрузка (импорт) операций из файла' />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'unload' && (
          <Modal title='Выгрузка (экспорт) операций'>
            <UnloadingOperations
              labelBadge='В этом окне Вы можете выгрузить необходимые Вам операции, предварительно настроив список'
              elements={selectedIds}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'settings' && (
          <Modal title='Настройки списка операций'>
            <SettingsListOperations />
          </Modal>
        )}
      </AnimatePresence>

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
    </ListLayout>
  )
}

const OperationsPage = () => {
  return (
    <OperationsFiltersProvider>
      <OperationsContent />
    </OperationsFiltersProvider>
  )
}

export default OperationsPage
