/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect, useRef } from 'react'
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'
import { TFormUploadingOperations } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { RadioButton } from '@/shared/ui/RadioButton'
import { DropZone } from '@/shared/ui/DropZone'

import styles from './uploading-operations.module.scss'
import { useImportOperationsMutation } from '@/features/imports/api/importsApi'
import { useModal } from '@/features/modal/hooks/useModal'

export const UploadingOperations: FC<IFormProps> = ({ labelBadge }) => {
  const [importOperations, { isLoading, isError, isSuccess, reset }] = useImportOperationsMutation()
  const { handleCloseModal } = useModal()
  
  // Используем ref для отслеживания предыдущих файлов, чтобы не отправлять повторно
  const previousFilesRef = useRef<string[]>([])
  
  const { control, handleSubmit, watch, setValue } = useForm<TFormUploadingOperations>({
    defaultValues: {
      fileType: '1cExchange', // Устанавливаем значение по умолчанию
      files: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  })

  const onSubmit: SubmitHandler<TFormUploadingOperations> = async (data) => {
    if (!data.fileType || fields.length === 0) return

    // Создаем FormData
    const formData = new FormData()

    // Добавляем тип импорта
    formData.append('importType', data.fileType)

    // Добавляем все файлы
    fields.forEach((field) => {
      formData.append(`files`, field.file)
    })

    try {
      await importOperations(formData).unwrap()
    } catch (error) {
      console.error('Ошибка при отправке файлов:', error)
    }
  }

  const [acceptTypes, setAcceptTypes] = useState<boolean>(false)
  const [importReport, setImportReport] = useState<{
    loaded: string;
    income: string;
    expense: string;
    duplicateError: string;
    formatError: string;
  } | null>(null)

  // ПРАВИЛЬНЫЕ MIME-типы для txt и csv файлов
  const acceptedTypes = ['text/plain', 'text/csv']

  // Расширения для дополнительной проверки
  const acceptedExtensions = ['.txt', '.csv']

  const handleDropFile = (acceptedFiles: File[]) => {
    // Сбрасываем статус импорта при добавлении новых файлов
    reset()
    setImportReport(null)
    
    append(
      acceptedFiles.map((file) => ({
        file,
      }))
    )
  }

  const handleRemoveFile = (index: number) => {
    remove(index)
    // Сбрасываем статус импорта при удалении файлов
    reset()
    setImportReport(null)
    previousFilesRef.current = []
  }

  const selectedFileType = watch('fileType')

  // Функция для отправки файла
  const sendFile = async (file: File) => {
    if (!selectedFileType || !file) return

    const formData = new FormData()
    formData.append('importType', selectedFileType)
    formData.append('files', file)

    try {
      const result = await importOperations(formData).unwrap()
      setImportReport({
        loaded: result.operations,
        income: result.dohod,
        expense: result.rashod,
        duplicateError: result.dublicate,
        formatError: result.error_format,
      })
    } catch (error) {
      console.error('Ошибка при отправке файла:', error)
    }
  }

  // Проверяем файлы при изменении fields или selectedFileType
  useEffect(() => {
    if (fields.length === 0) {
      setAcceptTypes(false)
      return
    }

    // Улучшенная проверка файлов
    const allFilesValid = fields.every((field) => {
      const file = field.file

      // Проверка MIME-типа
      if (acceptedTypes.includes(file.type)) {
        return true
      }

      // Проверка расширения файла
      const fileName = file.name.toLowerCase()
      if (acceptedExtensions.some((ext) => fileName.endsWith(ext))) {
        return true
      }

      // Дополнительная проверка для .csv файлов (иногда у них тип 'application/vnd.ms-excel')
      if (fileName.endsWith('.csv')) {
        return true
      }

      return false
    })

    setAcceptTypes(allFilesValid)
    
    // Автоматически отправляем файлы, если они валидны и есть выбранный тип
    if (allFilesValid && selectedFileType && fields.length > 0) {
      // Проверяем, изменились ли файлы, чтобы не отправлять повторно
      const currentFileNames = fields.map(field => `${field.file.name}-${field.file.size}`)
      
      if (JSON.stringify(previousFilesRef.current) !== JSON.stringify(currentFileNames)) {
        previousFilesRef.current = currentFileNames
        
        // Отправляем каждый файл
        fields.forEach(field => {
          sendFile(field.file)
        })
      }
    }
  }, [fields, selectedFileType])

  // Обработчик для радио-кнопки
  const handleRadioChange = (value: string) => {
    setValue('fileType', value)
    
    // Если есть валидные файлы, отправляем их заново с новым типом
    if (fields.length > 0 && acceptTypes) {
      reset()
      setImportReport(null)
      previousFilesRef.current = []
      
      fields.forEach(field => {
        sendFile(field.file)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.uploadOperation}>
      {labelBadge && <Badge label={labelBadge} />}

      <div className={styles['uploadOperation__body']}>
        <h3 className={styles.uploadOperation__title}>Выбор типа файла импорта</h3>
        <Controller
          name='fileType'
          control={control}
          render={({ field }) => (
            <fieldset>
              <div className={styles['uploadOperation__type-file']}>
                <RadioButton
                  label='1С Exchange'
                  id='1cExchange'
                  name={field.name}
                  value='1cExchange'
                  checked={true}
                  onChange={() => handleRadioChange('1cExchange')}
                />
              </div>
            </fieldset>
          )}
        />

        <div className={styles['uploadOperation__action-loading']}>
          <h3 className={styles.uploadOperation__title}>Загрузка файла</h3>
          <DropZone
            onDrop={handleDropFile}
            onRemoveFile={handleRemoveFile}
            files={fields}
            accept={setAcceptTypes}
            acceptedTypes={acceptedTypes}
          />
        </div>

        {/* Показываем статус отправки */}
        {isLoading && (
          <div className={styles.loadingBlock}>
            <span>Идет импорт файлов...</span>
          </div>
        )}

        {isError && (
          <div className={styles.errorBlock}>
            <span>Ошибка при импорте файлов</span>
          </div>
        )}

        {/* Показываем отчет об импорте после успешной отправки */}
        {isSuccess && importReport && (
          <div className={styles.importAcceptBlock}>
            <span className={styles.title}>Импорт проведен успешно!</span>
            <div className={styles.infoBlock}>
              <span>Отчет о загрузке</span>
              <div className={styles.info}>
                <div className={styles.leftSide}>
                  <p>Операций загружено: </p>
                  <p>Из них приход: </p>
                  <p>Из них расход: </p>
                  <br />
                  <p>Ошибка, дубль: </p>
                  <p>Ошибка формата: </p>
                </div>
                <div className={styles.rightSide}>
                  <p>{importReport.loaded}</p>
                  <p>{importReport.income}</p>
                  <p>{importReport.expense}</p>
                  <br />
                  <p>{importReport.duplicateError}</p>
                  <p>{importReport.formatError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Показываем сообщение о готовности файлов к отправке */}
        {fields.length > 0 && selectedFileType && acceptTypes && !isLoading && !isSuccess && !importReport && (
          <div className={styles.infoBlock}>
            <span>Файлы проверены и готовы к импорту</span>
            <p>Импорт начнется автоматически...</p>
          </div>
        )}

        {/* Показываем ошибку если:
            1. Есть файлы
            2. ИЛИ не выбран тип файла
            3. ИЛИ файлы не валидны */}
        {fields.length > 0 && (!selectedFileType || !acceptTypes) && (
          <span className={styles.errorTitle}>
            Импорт некорректен:{' '}
            {!selectedFileType ? 'тип файла не выбран' : 'файл неверного формата или поврежден'}
          </span>
        )}
      </div>

      {/* Кнопка для повторной отправки или дополнительных действий */}
      <Button
        mode='primary'
        type='submit'
        label={isLoading ? 'Идет импорт...' : 'Завершить'}

        
        // Кнопка активна, если есть валидные файлы и выбран тип
        disabled={!selectedFileType || fields.length === 0 || !acceptTypes || isLoading}
        onClick={handleCloseModal}
      />
    </form>
  )
}