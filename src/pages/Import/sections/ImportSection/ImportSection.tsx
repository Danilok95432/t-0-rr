import { importDef } from '@/features/import/table/config/importDef'
import { GridTable } from '@/shared/ui/GridTable'

import styles from './import.module.scss'
import {
  useDeleteImportOperationsMutation,
  useGetImportOperationsQuery,
  useLazyGetImportOperationsCSVQuery,
} from '@/features/imports/api/importsApi'
import { useParams } from 'react-router'
import { useModal } from '@/features/modal/hooks/useModal'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'motion/react'
import { Modal } from '@/shared/ui/Modal'
import { ConfirmWindow } from '@/features/import/confirm-window/confirm-window'

export const ImportSection = () => {
  const { id } = useParams()
  const { buttonId } = useModal()
  const { data: importOperations } = useGetImportOperationsQuery(id ?? '')

  const [getImportOperationsCSV] = useLazyGetImportOperationsCSVQuery({
    refetchOnReconnect: true,
  })
  const downloadBlobRef = useRef<Blob | null>(null)

  const downloadHandler = useCallback(async () => {
    if (!id) return

    try {
      const result = await getImportOperationsCSV(id)
      if (result.data) {
        downloadBlobRef.current = result.data
      }
    } catch (error) {
      toast.error(`Ошибка при запросе CSV: ${error}`, {
        position: 'bottom-right',
      })
    }
  }, [getImportOperationsCSV, id])

  useEffect(() => {
    const downloadCSV = async (blob: Blob) => {
      try {
        const arrayBuffer = await blob.arrayBuffer()

        const decoders = [
          { name: 'windows-1251', decoder: new TextDecoder('windows-1251') },
          { name: 'utf-8', decoder: new TextDecoder('utf-8') },
          { name: 'iso-8859-1', decoder: new TextDecoder('iso-8859-1') },
        ]

        let decodedData = ''
        for (const { name, decoder } of decoders) {
          try {
            decodedData = decoder.decode(arrayBuffer)
            if (!decodedData.includes('�')) {
              console.log(`Успешная кодировка: ${name}`)
              break
            }
          } catch {
            console.log(`Кодировка ${name} не подошла`)
          }
        }

        const correctedBlob = new Blob([decodedData], { type: 'text/csv; charset=utf-8' })
        const url = URL.createObjectURL(correctedBlob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `operations.csv`)
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        downloadBlobRef.current = null
      } catch (error) {
        toast.error(`Ошибка при обработке CSV: ${error}`, {
          position: 'bottom-right',
        })
      }
    }

    if (downloadBlobRef.current) {
      downloadCSV(downloadBlobRef.current)
    }
  }, [downloadBlobRef.current])

  useEffect(() => {
    if (buttonId === 'unload') {
      downloadHandler()
    }
  }, [buttonId, downloadHandler])

  const [deleteOperations] = useDeleteImportOperationsMutation()

  const handleDelete = () => {
    deleteOperations(id ?? '')
  }

  return (
    <>
      <section className={styles.importData}>
        <GridTable
          columnDefinitions={importDef}
          rowData={importOperations}
          checkboxHidden={false}
        />
      </section>
      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'delete' && (
          <Modal title='Удалить импорт'>
            <ConfirmWindow
              labelBadge='Вы собираетесь удалить импортированные операции. Подтвердите действие'
              submitHandle={handleDelete}
              link={'/imports'}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
