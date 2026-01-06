/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'
import { TFormUploadingOperations } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { RadioButton } from '@/shared/ui/RadioButton'
import { DropZone } from '@/shared/ui/DropZone'

import styles from './uploading-operations.module.scss'

export const UploadingOperations: FC<IFormProps> = ({ labelBadge }) => {
  const { control, handleSubmit, watch } = useForm<TFormUploadingOperations>({
    defaultValues: {
      fileType: undefined,
      files: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  })

  const onSubmit: SubmitHandler<TFormUploadingOperations> = (data) => {
    console.log(data)
  }

  const [acceptTypes, setAcceptTypes] = useState<boolean>(false)

  // MIME-типы для txt файлов
  const acceptedTypes = ['text/plain', 'text/csv', 'application/vnd.ms-excel']

  // Можно добавить проверку по расширению в дополнение к MIME-типу
  const acceptedExtensions = ['.txt', '.csv']

  const handleDropFile = (acceptedFiles: File[]) => {
    append(
      acceptedFiles.map((file) => ({
        file,
      }))
    )
  }

  const handleRemoveFile = (index: number) => {
    remove(index)
  }

  const selectedFileType = watch('fileType')

  // Проверяем файлы при изменении fields или selectedFileType
  useEffect(() => {
    if (fields.length === 0) {
      setAcceptTypes(false)
      return
    }

    // Проверяем все файлы на соответствие типам
    const allFilesValid = fields.every(
      (field) =>
        acceptedTypes.includes(field.file.type) ||
        acceptedExtensions.some((ext) => field.file.name.toLowerCase().endsWith(ext))
    )

    setAcceptTypes(allFilesValid)
  }, [acceptedExtensions, acceptedTypes, fields, selectedFileType])

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
                  onChange={() => field.onChange('1cExchange')}
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

        {/* Показываем успешный импорт только если: 
					1. Есть файлы
					2. Выбран тип файла
					3. Все файлы валидны */}
        {fields.length > 0 && selectedFileType && acceptTypes && (
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
                  <p>1</p>
                  <p>1</p>
                  <p>1</p>
                  <br />
                  <p>1</p>
                  <p>1</p>
                </div>
              </div>
            </div>
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

      <Button
        mode='primary'
        type='submit'
        label='Загрузить операцию'
        // Кнопка активна только если:
        // 1. Выбран тип файла
        // 2. Есть файлы
        // 3. Все файлы валидны
        disabled={!selectedFileType || fields.length === 0 || !acceptTypes}
      />
    </form>
  )
}
