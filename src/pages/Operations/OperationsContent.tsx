import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { FilterOperations } from '@/features/operations/filterOperations'
import { NewOperation } from '@/features/operations/newOperation'
import { UnloadingOperations } from '@/features/operations/unloadingOperations'
import { UploadingOperations } from '@/features/operations/uploadingOperations'
import { SettingsListOperations } from '@/features/operations/settingsListOperations'
import { ProcessingOperation } from '@/features/operations/processingOperation'
import { operationsDef } from '@/features/operations/table/config/operationsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { Modal } from '@/shared/ui/Modal'
import { RowClickedEvent } from 'ag-grid-community'

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

const LIMIT = LIMIT_TABLE_DATA

const OperationsContent = () => {
  const { buttonId, openModalById } = useModal()
  const { value } = useQuickFilter()
  const { filters } = useOperationsFilters()
  const filtersKey = filters ? JSON.stringify(filters) : ''

  const [step, setStep] = useState(0)
  const [operations, setOperations] = useState<OperationsData[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)

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

  // Преобразуем фильтры в параметры запроса
  const getQueryParams = (): GetAllOperationsArgs => {
    const params: GetAllOperationsArgs = {
      searchtext: value || '',
      step,
      limit: LIMIT,
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

  // Используем skip в запросе, чтобы не выполнять его до инициализации фильтров
  const { data, isFetching, isLoading } = useGetAllOperationsQuery(getQueryParams())

  // const { data: summary } = useGetSummaryQuery(value, {
  //   skip: !isInitialized, // Также для summary
  // })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageData = data?.cards ?? []

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
    setStep(0)
    setOperations([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [value, filtersKey])

  useEffect(() => {
    if (!pageData.length) return
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
    }
  }, [pageData, step])

  useEffect(() => {
    if (step === 0) return
    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return
    viewport.scrollTop = scrollTopRef.current
  }, [operations.length, step])

  useEffect(() => {
    if (!hasMore) return
    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return
    const handleScroll = () => {
      if (isFetching || isLoading || !hasMore) return
      const { scrollTop, scrollHeight, clientHeight } = viewport
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
      scrollTopRef.current = scrollTop
      if (distanceToBottom < 200) {
        setStep((prev) => prev + LIMIT)
      }
    }
    viewport.addEventListener('scroll', handleScroll)
    return () => {
      viewport.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, isFetching, isLoading])

  return (
    <ListLayout
      title='Операции'
      noSearch
      wideRow
      totalInfoData={[
        {
          name: 'Всего операций',
          value: `${data?.count}`,
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
      ]}
    >
      <FiltersMenu>
        <FilterOperations />
      </FiltersMenu>

      <GridTable
        rowData={operations}
        columnDefinitions={operationsDef}
        quickFilterText={value}
        onRowClicked={handleRowClick}
      />

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новая операция'>
            <NewOperation />
          </Modal>
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
            <UnloadingOperations labelBadge='В этом окне Вы можете выгрузить необходимые Вам операции, предварительно настроив список' />
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
        {buttonId.split('-')[0] === 'processing' && (
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
