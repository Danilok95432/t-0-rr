import { FC } from 'react'
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'
import { TFormUploadingOperations } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { RadioButton } from '@/shared/ui/RadioButton'
import { DropZone } from '@/shared/ui/DropZone'

// import { downloadReportItems } from '@/mock/download-report'
// import { downloadErrorItems } from '@/mock/download-error'

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
									checked={field.value === '1cExchange'}
									onChange={() => field.onChange('1cExchange')}
								/>
								<RadioButton
									label='Yandex Set'
									id='YSet'
									name={field.name}
									value='YSet'
									checked={field.value === 'YSet'}
									onChange={() => field.onChange('YSet')}
								/>
								<RadioButton
									label='Собственный формат'
									id='custom'
									name={field.name}
									value='custom'
									checked={field.value === 'custom'}
									onChange={() => field.onChange('custom')}
								/>

								<a href='#' className={styles['uploadOperation__type-file-link']}>
									Настройка собственного формата
								</a>
							</div>
						</fieldset>
					)}
				/>

				<div className={styles['uploadOperation__action-loading']}>
					<h3 className={styles.uploadOperation__title}>Загрузка файла</h3>
					<DropZone onDrop={handleDropFile} onRemoveFile={handleRemoveFile} files={fields} />
				</div>

				{!selectedFileType && !!fields.length && (
					<span className={styles['uploadOperation__error']}>
						Для того, чтобы загрузить данные операций, необходимо выбрать формат импортируемого
						файла
					</span>
				)}
			</div>

			{/* В случае успешной загрузки */}
			{/* <div className={styles.downloadReport}>
				<h3 className={styles.downloadReport__title}>Импорт проведен успешно!</h3>

				<p className={styles.downloadReport__subtitle}>Отчет о загрузке</p>
				<ul className={styles['downloadReport__main-info']}>
					{downloadReportItems.map((item) => (
						<li className={styles.downloadReport__values}>
							<span>{item.title}</span>
							<span>{item.value}</span>
						</li>
					))}
				</ul>
				<ul className={styles['downloadReport__error-info']}>
					{downloadErrorItems.map((item) => (
						<li className={styles.downloadReport__values}>
							<span>{item.title}</span>
							<span>{item.value}</span>
						</li>
					))}
				</ul>
			</div>
			<a href=''>
				<Button mode='primary' label='Перейти на страницу результата импорта' />
			</a> */}
			{/*  */}

			<Button
				mode='primary'
				type='submit'
				label='Загрузить операцию'
				disabled={!selectedFileType || !fields.length}
			/>
		</form>
	)
}
