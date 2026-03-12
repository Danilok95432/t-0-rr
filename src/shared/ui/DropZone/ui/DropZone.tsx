import { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IDropZoneProps } from '../types'

import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/Button'

import styles from './dropZone.module.scss'

export const DropZone: FC<IDropZoneProps> = ({
  files,
  onDrop,
  onRemoveFile,
  accept,
  acceptedTypes,
  maxFiles = 1, // 👈 новый пропс с значением по умолчанию 1
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Улучшенный валидатор
  const validator = (file: File) => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return null
    }
    
    // Проверяем MIME-тип
    if (acceptedTypes.includes(file.type)) {
      return null
    }
    
    // Проверяем расширение файла
    const fileName = file.name.toLowerCase()
    if (fileName.endsWith('.txt') || fileName.endsWith('.csv')) {
      return null
    }
    
    return {
      code: 'invalid-file-type',
      message: `Недопустимый тип файла. Разрешены: TXT, CSV`
    }
  }

  // Проверка на максимальное количество файлов
  const handleDrop = (acceptedFiles: File[]) => {
    // Проверяем, не превысит ли добавление новых файлов лимит
    if (files && files.length + acceptedFiles.length > maxFiles) {
      setErrorMessage(`Можно загрузить не более ${maxFiles} ${getFilesWord(maxFiles)}`)
      return
    }
    
    // Если все хорошо, вызываем onDrop
    onDrop(acceptedFiles)
  }

  // Вспомогательная функция для склонения слова "файл"
  const getFilesWord = (count: number): string => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'файла'
    }
    return 'файлов'
  }

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: handleDrop,
    validator,
    onError: (err) => setErrorMessage(err.message),
    maxFiles, // 👈 передаем лимит в react-dropzone
    // Явно указываем accept для лучшей совместимости
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'], // Для старых систем
    }
  })

  // Очищаем ошибку при успешной загрузке
  useEffect(() => {
    if (files && files.length > 0) {
      setErrorMessage('')
    }
  }, [files])

  // Показываем ошибки из fileRejections
  useEffect(() => {
    if (fileRejections.length > 0) {
      const errors = fileRejections.map(rejection => 
        rejection.errors.map(error => error.message).join(', ')
      ).join(', ')
      
      setErrorMessage(`Ошибка загрузки: ${errors}`)
    }
  }, [fileRejections])

  // Проверяем текущие файлы
  useEffect(() => {
    if (!files) return
    
    const allFilesValid = files.every(file => {
      const fileName = file.file.name.toLowerCase()
      
      // Проверка MIME-типа
      if (acceptedTypes?.includes(file.file.type)) {
        return true
      }
      
      // Проверка расширения
      if (fileName.endsWith('.txt') || fileName.endsWith('.csv')) {
        return true
      }
      
      return false
    })
    
    // Передаем результат валидации в родительский компонент
    if (accept) {
      accept(allFilesValid)
    }
    
    // Если файлы есть, но невалидные - показываем ошибку
    if (files.length > 0 && !allFilesValid) {
      setErrorMessage('Загружен файл неверного формата. Разрешены только TXT и CSV')
    }
  }, [files, acceptedTypes, accept])

  return (
    <>
      {/* Сообщение об ошибке */}
      {errorMessage && (
        <div className={styles.errorContainer}>
          <span className={styles.errorText}>{`Ошибка загрузки. Превышен лимит загруженных файлов. Лимит: ${maxFiles}`}</span>
        </div>
      )}

      {/* Файл не загружен или можно добавить еще файлы */}
      {(!files?.length || (maxFiles > 1 && files.length < maxFiles)) ? (
        <section className={styles.container}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className={styles.dropzone__label}>
              <span>Выберите файл</span> или перетащите файл сюда
              {maxFiles > 1 && (
                <span className={styles.dropzone__hint}>
                  {` (можно загрузить до ${maxFiles} ${getFilesWord(maxFiles)})`}
                </span>
              )}
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Файлы загружены */}
          {files.map((file, index) => (
            <div className={styles['uploadFile-wrapper']} key={file.id}>
              <Icon iconId='file' className={styles['uploadFile-icon']} />
              <div className={styles.uploadFile}>
                {file.file.name}{' '}
                <span className={styles.sizeFile}>{Math.round(file.file.size / 1024)} Б</span>
              </div>
              <Button
                mode='clear'
                icon={<Icon iconId='input-reset' />}
                className={styles.deleteFile}
                onClick={() => onRemoveFile(index)}
              />
            </div>
          ))}
        </>
      )}
    </>
  )
}
