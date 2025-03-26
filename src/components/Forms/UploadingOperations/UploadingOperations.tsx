import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IFormProps } from '@/types/form'
import { useModal } from '@/hooks/useModal'

import { Badge } from '@/components/Badge'

import styles from './uploading-operations.module.scss'
import { Button } from '@/components/Button'
import { RadioButton } from '@/components/RadioButton'
import { TFormUploadingOperations } from '@/types/formUploadingOperations'
import { DropZone } from '@/components/DropZone'

export const UploadingOperations: FC<IFormProps> = ({ hasBadge, labelBadge }) => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit, reset } = useForm<TFormUploadingOperations>({
		defaultValues: {
			fileType: undefined,
		},
	})

	const onSubmit: SubmitHandler<TFormUploadingOperations> = (data) => {
		console.log(data)
		reset()
		// handleCloseModal()
	}

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
									name='1cExchange'
									value='1cExchange'
									checked={field.value === '1cExchange'}
									onChange={() => field.onChange('1cExchange')}
								/>
								<RadioButton
									label='Yandex Set'
									id='YSet'
									name='YSet'
									value='YSet'
									checked={field.value === 'YSet'}
									onChange={() => field.onChange('YSet')}
								/>
								<RadioButton
									label='Собственный формат'
									id='custom'
									name='custom'
									value='custom'
									checked={field.value === 'custom'}
									onChange={() => field.onChange('custom')}
								/>

								<a href='#'>Настройка собственного формата</a>
							</div>
						</fieldset>
					)}
				/>

				<div className={styles['uploadOperation__action-loading']}>
					<h3 className={styles.uploadOperation__title}>Загрузка файла</h3>
					<DropZone />
				</div>
			</div>

			<Button mode='primary' type='submit' label='Загрузить операцию' />
		</form>
	)
}
