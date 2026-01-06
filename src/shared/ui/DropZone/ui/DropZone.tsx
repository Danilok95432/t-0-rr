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
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validator = (file: File) => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return null
    }
    
    if (!acceptedTypes.includes(file.type)) {
      return {
        code: 'invalid-file-type',
        message: `Недопустимый тип файла. Разрешены: ${acceptedTypes.join(', ')}`
      }
    }
    
    return null
  }

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    validator,
    onError: (err) => setErrorMessage(err.message),
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
    if (!accept || !acceptedTypes || !files) return
    
    const allFilesValid = files.every(file => 
      acceptedTypes.includes(file.file.type)
    )
    
    accept(allFilesValid)
    
    // Если файлы есть, но невалидные - показываем ошибку
    if (files.length > 0 && !allFilesValid) {
      setErrorMessage('Загружен файл неверного формата')
    }
  }, [files, acceptedTypes, accept])

  return (
    <>
      {/* Сообщение об ошибке */}
      {errorMessage && (
        <div className={styles.errorContainer}>
          <Icon iconId="warning" className={styles.errorIcon} />
          <span className={styles.errorText}>{errorMessage}</span>
        </div>
      )}

      {/* Файл не загружен */}
      {!files?.length ? (
        <section className={styles.container}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className={styles.dropzone__label}>
              <span>Выберите файл</span> или перетащите файл сюда
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Файл загружен */}
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