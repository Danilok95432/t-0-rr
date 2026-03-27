/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence } from 'motion/react'
import { useModal } from '@/features/modal/hooks/useModal'
import { NewDeals } from '@/features/deals/newDeals'
import { dealsDef } from '@/features/deals/table/config/dealsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { GetAllDealsArgs, useGetAllDealsQuery } from '@/features/deals/api/dealsApi'
import { mapDeals } from '@/features/deals/lib/mapDeals'
import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { Loader } from '@/shared/ui/Loader'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { LIMIT_TABLE_DATA } from '@/shared/lib/const'
import { DealsDTO } from '@/features/deals/table/config/dealsType'
import { useNavigate } from 'react-router'
import { GridApi, RowClickedEvent } from 'ag-grid-community'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { FilterDeals } from '@/features/deals/filterDeals'
import {
  DealsFiltersProvider,
  useDealsFilters,
} from '@/features/filtersMenu/context/dealsFiltersContext'

const LIMIT = LIMIT_TABLE_DATA

const TransactionsContent = () => {
  const { buttonId } = useModal()
  const { value: quickFilterValue } = useQuickFilter()
  const { filters } = useDealsFilters()

  const [step, setStep] = useState(0)
  const [dealsList, setDealsList] = useState<DealsDTO[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)
  const isInitialMount = useRef(true)

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

  const getQueryParams = (): GetAllDealsArgs => {
    const params: GetAllDealsArgs = {
      searchtext: '',
      step,
      limit: LIMIT,
    }
    if (filters) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rememberChoice, ...filterParams } = filters

      if (filterParams.deal_date) {
        const dateDateValue = dateToISOString(filterParams.deal_date)
        if (dateDateValue) {
          params.deal_date = dateDateValue
        }
      }

      if (filterParams.org) {
        const orgValues = extractValues(filterParams.org)
        if (orgValues.length > 0) {
          params.org = orgValues.join(',')
        }
      }

      if (filterParams.contragent) {
        const contragentValues = extractValues(filterParams.contragent)
        if (contragentValues.length > 0) {
          params.contragent = contragentValues.join(',')
        }
      }

      if (filterParams.cases) {
        const casesValue = extractValues(filterParams.cases)[0]
        if (casesValue) {
          params.cases = casesValue
        }
      }

      if (filterParams.deal_name) {
        const dealsValue = filterParams.deal_name
        if (dealsValue) {
          params.deal_name = dealsValue
        }
      }
    }
    return params
  }

  const { data, isFetching, isLoading } = useGetAllDealsQuery(getQueryParams())

  const pageData = useMemo(() => {
    return data?.map((deal) => mapDeals(deal)) || []
  }, [data])
  const navigate = useNavigate()

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
      const totalRows = pageData.length
  
      if (lastRow >= totalRows - 5) {
        saveScrollPosition()
        setStep((prev) => prev + LIMIT)
      }
    }, [isFetching, isLoading, hasMore, pageData.length])
  
    useEffect(() => {
      if (pageData.length === 0) return
      restoreScrollPosition()
    }, [pageData.length])

  const handleRowClick = useCallback(
    (params: RowClickedEvent<DealsDTO>) => {
      const target = params.event?.target as HTMLElement | null

      if (target?.closest('.ag-selection-checkbox')) {
        return
      }

      if (!params.data?.id) return
      navigate(`/deal/${params.data.id}`)
    },
    [navigate],
  )

  useEffect(() => {
      if (buttonId !== null) return
      restoreScrollPosition()
    }, [buttonId])

  // Сброс состояния при изменении фильтра
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setStep(0)
    setDealsList([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [quickFilterValue])

  // Обновление списка сделок при изменении данных или шага
  useEffect(() => {
    if (!pageData.length) {
      setDealsList([])
      return
    }

    setDealsList((prev) => {
      if (step === 0) {
        return pageData.slice(0, LIMIT)
      }
      const existingIds = new Set(prev.map((op) => op.id))
      const newItems = pageData.filter((op) => !existingIds.has(op.id))
      const itemsToAdd = newItems.slice(0, LIMIT)
      return [...prev, ...itemsToAdd]
    })

    if (pageData.length <= dealsList.length + LIMIT) {
      setHasMore(false)
    }
  }, [pageData, step]) // Убрана dealsList из зависимостей

  // Инициализация данных при первом рендере
  useEffect(() => {
    if (pageData.length > 0 && dealsList.length === 0) {
      setDealsList(pageData.slice(0, LIMIT))
      setHasMore(pageData.length > LIMIT)
    }
  }, [pageData, dealsList.length])

  return (
    <ListLayout
      title='Сделки'
      totalInfoData={[
        {
          name: 'Всего сделок',
          value: `${pageData.length}`,
        },
      ]}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <GridTable
          columnDefinitions={dealsDef}
          rowData={pageData}
          quickFilterText={quickFilterValue}
          checkboxHidden={false}
          onRowClicked={handleRowClick}
          onGridReady={handleGridReady}
          onScrollEnd={handleScrollLoad}
        />
      )}
      <FiltersMenu>
        <FilterDeals />
      </FiltersMenu>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новая сделка'>
            <NewDeals />
          </Modal>
        )}
      </AnimatePresence>
    </ListLayout>
  )
}

const DealsPage = () => {
  return (
    <DealsFiltersProvider>
      <TransactionsContent />
    </DealsFiltersProvider>
  )
}

export default DealsPage
