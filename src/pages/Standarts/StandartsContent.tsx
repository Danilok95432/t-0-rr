import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
//
import { Loader } from '@/shared/ui/Loader'
import { RowClickedEvent } from 'node_modules/ag-grid-community/dist/types/src/events'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LIMIT_TABLE_DATA } from '@/shared/lib/const'
import { IStandartData } from '@/features/standarts/table/configs/standartsTypes'
import { standartDef } from '@/features/standarts/table/configs/standartsDef'
import { useGetAllStandartsQuery } from '@/features/standarts/api/standartsApi'
//

const StandartsContent = () => {
  const { value } = useQuickFilter()

  const [step, setStep] = useState(0)
  const [standarts, setStandarts] = useState<IStandartData[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)
  const navigate = useNavigate()

  const { data, isFetching, isLoading } = useGetAllStandartsQuery({
    searchtext: value,
    step,
    limit: LIMIT_TABLE_DATA,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageData = data ?? []

  const handleRowClick = useCallback(
    (params: RowClickedEvent<IStandartData>) => {
      const target = params.event?.target as HTMLElement | null

      // не реагируем на клик по чекбоксу
      if (target?.closest('.ag-selection-checkbox')) {
        return
      }

      if (!params.data?.id) return

      navigate(`/standart/${params.data.id}`)
    },
    [navigate]
  )

  useEffect(() => {
    setStep(0)
    setStandarts([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [value])

  useEffect(() => {
    if (!pageData.length) return
    setStandarts((prev) => {
      if (step === 0) {
        return pageData
      }
      const existingIds = new Set(prev.map((op) => op.id))
      const newItems = pageData.filter((op) => !existingIds.has(op.id))
      return [...prev, ...newItems]
    })
    if (pageData.length < LIMIT_TABLE_DATA) {
      setHasMore(false)
    }
  }, [pageData, step])

  useEffect(() => {
    if (step === 0) return
    const viewport = document.querySelector('.ag-body-viewport') as HTMLElement | null
    if (!viewport) return
    viewport.scrollTop = scrollTopRef.current
  }, [standarts.length, step])

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
        setStep((prev) => prev + LIMIT_TABLE_DATA)
      }
    }
    viewport.addEventListener('scroll', handleScroll)
    return () => {
      viewport.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, isFetching, isLoading])
  return (
      <ListLayout
        title='Эталоны'
        totalInfoData={[
          {
            name: 'Всего эталонов',
            value: String(standarts?.length),
          },
        ]}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <GridTable
            columnDefinitions={standartDef}
            rowData={standarts}
            quickFilterText={value}
            checkboxHidden={false}
            onRowClicked={handleRowClick}
          />
        )}
      </ListLayout>
  )
}

export default StandartsContent