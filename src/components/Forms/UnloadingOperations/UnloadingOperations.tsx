import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IFormProps } from '@/shared/types/form'
import { TFormUnloadOperations } from '@/shared/types/formUnloadOperations'

import { Badge } from '@/shared/ui/Badge'
import { RadioButton } from '@/shared/ui/RadioButton'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'

import styles from './unloading-operations.module.scss'

export const UnloadingOperations: FC<IFormProps> = ({ labelBadge }) => {
	const { control, handleSubmit } = useForm<TFormUnloadOperations>({
		defaultValues: {
			mainFilter: undefined,
			uploadFormat: undefined,
			uploadData: {
				showIdOperation: false,
				showOrganization: false,
				showCase: false,
				showDateOperation: false,
				showCounterparty: false,
				showArticle: false,
			},
			uploadHeader: {
				showNumberOperations: false,
				showNumberAmountArrivalOperations: false,
				showAmountDifference: false,
				showNumberAmountMovements: false,
				showNumberAmountExpenseTransactions: false,
				showUploadAuthor: false,
			},
			saveSettings: false,
		},
	})

	const onSubmit: SubmitHandler<TFormUnloadOperations> = (data) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.unloadOperation}>
			{labelBadge && <Badge label={labelBadge} />}

			<Controller
				name='mainFilter'
				control={control}
				render={({ field }) => (
					<fieldset className={styles['unloadOperation__main-filter']}>
						<RadioButton
							id='selected'
							label='Выгрузить отобранные операции'
							name={field.name}
							value='selected'
							checked={field.value === 'selected'}
							onChange={() => field.onChange('selected')}
						/>
						<RadioButton
							id='all'
							label='Выгрузить все операции (игнорировать фильтр)'
							name={field.name}
							value='all'
							checked={field.value === 'all'}
							onChange={() => field.onChange('all')}
						/>
					</fieldset>
				)}
			/>

			<div className={styles['unloadOperation__upload-format']}>
				<h3 className={styles.unloadOperation__title}>Формат выгрузки</h3>
				<Badge label='Формат выгрузки зависит от того, для чего Вам нужен выгружаемый файл' />

				<Controller
					name='uploadFormat'
					control={control}
					render={({ field }) => (
						<fieldset className={styles['unloadOperation__upload-format-radio-wrapper']}>
							<RadioButton
								id='XLSX'
								name={field.name}
								label='XLSX для открытия в EXCEL или другом редакторе таблиц'
								value='XLSX'
								checked={field.value === 'XLSX'}
								onChange={() => field.onChange('XLSX')}
							/>
							<RadioButton
								id='JSON'
								name={field.name}
								label='JSON для чтения и подгрузки в системы, а также на некоторые веб-сайты'
								value='JSON'
								checked={field.value === 'JSON'}
								onChange={() => field.onChange('JSON')}
							/>
							<RadioButton
								id='CSV'
								name={field.name}
								label='Простой CSV для подгрузки в другие системы'
								value='CSV'
								checked={field.value === 'CSV'}
								onChange={() => field.onChange('CSV')}
							/>
						</fieldset>
					)}
				/>
			</div>

			<div className={styles['unloadOperation__upload-data']}>
				<h3 className={styles.unloadOperation__title}>Данные выгрузки</h3>
				<Badge label='Какие данные таблицы необходимо выгрузить' />

				<div className={styles['unloadOperation__upload-data-checkbox-wrapper']}>
					<Controller
						name='uploadData.showIdOperation'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать ID операции'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadData.showOrganization'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать организацию и счёт'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadData.showCase'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать кейс и сделку'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadData.showDateOperation'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать дату операции'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadData.showCounterparty'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать контрагента'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadData.showArticle'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать статью и подстатью'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles['unloadOperation__upload-header']}>
				<h3 className={styles.unloadOperation__title}>Заголовок выгрузки</h3>
				<Badge label='Какие данные сводки по операциям показывать в выгрузке' />

				<fieldset className={styles['unloadOperation__upload-header-checkbox-wrapper']}>
					<Controller
						name='uploadHeader.showNumberOperations'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Количество операций'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadHeader.showNumberAmountArrivalOperations'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Количество и сумма операций прихода'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadHeader.showAmountDifference'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Сумма разницы'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadHeader.showNumberAmountMovements'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Количество и сумма перемещений'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadHeader.showNumberAmountExpenseTransactions'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Количество и сумма операций расхода'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='uploadHeader.showUploadAuthor'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Автор выгрузки (пользователь)'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>
				</fieldset>
			</div>

			<div className={styles.formContentBottom}>
				<Button
					mode='primary'
					type='submit'
					label='Выгрузить'
					// disabled={}
				/>

				<Controller
					name='saveSettings'
					control={control}
					render={({ field }) => (
						<CheckBox
							label='Сохранить настройки для следующей выгрузки'
							checked={field.value}
							onChange={(isChecked) => field.onChange(isChecked)}
						/>
					)}
				/>
			</div>
		</form>
	)
}
