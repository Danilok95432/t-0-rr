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
  useGetAllOperationsQuery,
  useGetSummaryQuery,
} from '@/features/operations/api/operationsApi'
import type { OperationsData } from '@/features/operations/table/config/operationsTypes'

const LIMIT = 100

const OperationsContent = () => {
  const { buttonId, openModalById } = useModal()
  const { value } = useQuickFilter()

  const [step, setStep] = useState(0)
  const [operations, setOperations] = useState<OperationsData[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)

  const { data, isFetching, isLoading } = useGetAllOperationsQuery({
    searchtext: value,
    step,
    limit: LIMIT,
  })
  const { data: summary } = useGetSummaryQuery(value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageData = data?.cards ?? []

  const handleRowClick = useCallback(
    (params: RowClickedEvent<OperationsData>) => {
      const target = params.event?.target as HTMLElement | null

      // не реагируем на клик по чекбоксу
      if (target?.closest('.ag-selection-checkbox')) {
        return
      }

      if (!params.data?.id) return

      openModalById(`processing-${params.data.id}`)
    },
    [openModalById]
  )

  useEffect(() => {
    setStep(0)
    setOperations([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [value])

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
      totalInfoData={[
        {
          name: 'Всего операций',
          value: `${operations.length}`,
        },
        {
          name: 'Перемещения',
          value: ``,
        },
        {
          name: 'Приход',
          value: `${summary?.summ_inc ?? 0}`,
        },
        {
          name: 'Расход',
          value: `${summary?.summ_out ?? 0}`,
        },
        {
          name: 'Разница',
          value: `${summary?.summ_diff ?? 0}`,
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

export default OperationsContent
