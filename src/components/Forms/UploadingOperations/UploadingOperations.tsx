import { FC } from 'react'
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { IFormProps } from '@/types/form'
import { TFormUploadingOperations } from '@/types/formUploadingOperations'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import { RadioButton } from '@/components/RadioButton'
import { DropZone } from '@/components/DropZone'

import styles from './uploading-operations.module.scss'

export const UploadingOperations: FC<IFormProps> = ({ hasBadge, labelBadge }) => {
	const { control, handleSubmit, watch } = useForm<TFormUploadingOperations>({
		defaultValues: {
			fileType: undefined,
			files: [],
		},
	})

	const { append, fields, remove } = useFieldArray({
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
			{hasBadge && <Badge label={labelBadge} />}

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

			<div>
				<h3>Импорт проведен успешно!</h3>
			</div>

			<Button
				mode='primary'
				type='submit'
				label='Загрузить операцию'
				disabled={!selectedFileType || !fields.length}
			/>
		</form>
	)
}
