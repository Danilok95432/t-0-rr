import { GridTable } from '@/shared/ui/GridTable'

import styles from './standart.module.scss'
import { useParams } from 'react-router'
import { useModal } from '@/features/modal/hooks/useModal'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useGetStandartInfoQuery, useLazyGetStandartsCSVQuery } from '@/features/standarts/api/standartsApi'
import { standartInfoDef } from '@/features/standart/table/configs/standartDef'

export const StandartSection = () => {
  const { id } = useParams()
  const { buttonId } = useModal()
  const { data: standartData } = useGetStandartInfoQuery(id ?? '')

  const [getStandartCSV] = useLazyGetStandartsCSVQuery({
    refetchOnReconnect: true,
  })
  const downloadBlobRef = useRef<Blob | null>(null)

  const downloadHandler = useCallback(async () => {
    if (!id) return

    try {
      const result = await getStandartCSV(id)
      if (result.data) {
        downloadBlobRef.current = result.data
      }
    } catch (error) {
      toast.error(`Ошибка при запросе CSV: ${error}`, {
        position: 'bottom-right',
      })
    }
  }, [getStandartCSV, id])

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

  return (
    <section className={styles.standartData}>
      <GridTable columnDefinitions={standartInfoDef} rowData={standartData} checkboxHidden={false} />
    </section>
  )
}
