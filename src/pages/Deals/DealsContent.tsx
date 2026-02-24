import { AnimatePresence } from 'motion/react'
import { useModal } from '@/features/modal/hooks/useModal'
import { NewDeals } from '@/features/deals/newDeals'
import { dealsDef } from '@/features/deals/table/config/dealsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { useGetAllDealsQuery } from '@/features/deals/api/dealsApi'
import { mapDeals } from '@/features/deals/lib/mapDeals'
import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { Loader } from '@/shared/ui/Loader'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { LIMIT_TABLE_DATA } from '@/shared/lib/const'
import { DealsDTO } from '@/features/deals/table/config/dealsType'
import { useNavigate } from 'react-router'
import { RowClickedEvent } from 'ag-grid-community'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { FilterDeals } from '@/features/deals/filterDeals'

const LIMIT = LIMIT_TABLE_DATA

const TransactionsContent = () => {
  const { buttonId } = useModal()
  const { value: quickFilterValue } = useQuickFilter()

  const [step, setStep] = useState(0)
  const [dealsList, setDealsList] = useState<DealsDTO[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)
  const isInitialMount = useRef(true)

  const { data, isFetching, isLoading } = useGetAllDealsQuery({
    step,
  })

  const pageData = useMemo(() => {
    return data?.map((deal) => mapDeals(deal)) || []
  }, [data])
  const navigate = useNavigate()
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

  // Восстановление позиции скролла
  useEffect(() => {
    if (step === 0) return
    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return
    viewport.scrollTop = scrollTopRef.current
  }, [step]) // Убрана dealsList.length из зависимостей

  // Обработчик скролла с useCallback
  const handleScroll = useCallback(() => {
    if (isFetching || isLoading || !hasMore) return

    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return

    const { scrollTop, scrollHeight, clientHeight } = viewport
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
    scrollTopRef.current = scrollTop

    if (distanceToBottom < 200) {
      setStep((prev) => prev + LIMIT)
    }
  }, [hasMore, isFetching, isLoading])

  // Добавление/удаление обработчика скролла
  useEffect(() => {
    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return

    viewport.addEventListener('scroll', handleScroll)
    return () => {
      viewport.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

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

export default TransactionsContent
