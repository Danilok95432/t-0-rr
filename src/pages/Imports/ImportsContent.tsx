import { importsDef } from '@/features/imports/table/configs/importsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
//
import { useGetAllImportsQuery } from '@/features/imports/api/importsApi'
import { Loader } from '@/shared/ui/Loader'
import { RowClickedEvent } from 'node_modules/ag-grid-community/dist/types/src/events'
import { useState, useRef, useCallback, useEffect } from 'react'
import { IImportsData } from '@/features/imports/table/configs/importsTypes'
import { useNavigate } from 'react-router'
import { LIMIT_TABLE_DATA } from '@/shared/lib/const'
import { useModal } from '@/features/modal/hooks/useModal'
import { AnimatePresence } from 'motion/react'
import { UploadingOperations } from '@/features/operations/uploadingOperations'
import { Modal } from '@/shared/ui/Modal'
//

const ImportsContent = () => {
  const { value } = useQuickFilter()
  const { buttonId } = useModal()

  const [step, setStep] = useState(0)
  const [imports, setImports] = useState<IImportsData[]>([])
  const [hasMore, setHasMore] = useState(true)

  const scrollTopRef = useRef(0)
  const navigate = useNavigate()

  const { data, isFetching, isLoading } = useGetAllImportsQuery({
    searchtext: value,
    step,
    limit: LIMIT_TABLE_DATA,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageData = data ?? []

  const handleRowClick = useCallback(
    (params: RowClickedEvent<IImportsData>) => {
      const target = params.event?.target as HTMLElement | null

      // не реагируем на клик по чекбоксу
      if (target?.closest('.ag-selection-checkbox')) {
        return
      }

      if (!params.data?.id) return
      else if (target?.closest('.standart-class')) {
        navigate(`/standart/${params.data.id}`)
        return
      }

      navigate(`/import/${params.data.id}`)
    },
    [navigate]
  )

  useEffect(() => {
    setStep(0)
    setImports([])
    setHasMore(true)
    scrollTopRef.current = 0
  }, [value])

  useEffect(() => {
    if (!pageData.length) return
    setImports((prev) => {
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
  }, [imports.length, step])

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
    <>
      <ListLayout
        title='Импорты'
        totalInfoData={[
          {
            name: 'Всего импортов',
            value: String(imports?.length),
          },
        ]}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <GridTable
            columnDefinitions={importsDef}
            rowData={imports}
            quickFilterText={value}
            checkboxHidden={false}
            onRowClicked={handleRowClick}
          />
        )}
      </ListLayout>
      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'import' && (
          <Modal title='Загрузка (импорт) операций'>
            <UploadingOperations labelBadge='В этой форме производится массовая загрузка (импорт) операций из файла' />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImportsContent
