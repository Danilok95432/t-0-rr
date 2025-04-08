import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'
import { TFormSettingsListOperations } from '@/shared/types/forms'
import { useModal } from '@/features/modal/hooks/useModal'

import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'
import { RadioButton } from '@/shared/ui/RadioButton'

import styles from './settingsList-operations.module.scss'

export const SettingsListOperations: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit, watch } = useForm<TFormSettingsListOperations>({
		defaultValues: {
			tableColumns: {
				showIdOperation: false,
				showOrganization: false,
				showCase: false,
				showDateOperation: false,
				showCounterparty: false,
				showArticle: false,
			},
			amounts: {
				showSelectedOperations: false,
				showAmountArrivals: false,
				showAmountDifference: false,
				showAmountMovements: false,
				showAmountExpenses: false,
			},
			filterListOperations: undefined,
		},
	})

	const onSubmit: SubmitHandler<TFormSettingsListOperations> = (data) => {
		console.log(data)
		handleCloseModal()
	}

	const selectFilterListOperations = watch('filterListOperations')

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.settingsListOperations}>
			<div className={styles['settingsListOperations__table-columns']}>
				<h3 className={styles.settingsListOperations__title}>Столбцы таблицы</h3>

				<div className={styles['settingsListOperations__table-columns-checkbox-wrapper']}>
					<Controller
						name='tableColumns.showIdOperation'
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
						name='tableColumns.showOrganization'
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
						name='tableColumns.showCase'
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
						name='tableColumns.showDateOperation'
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
						name='tableColumns.showCounterparty'
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
						name='tableColumns.showArticle'
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

			<div className={styles['settingsListOperations__amounts']}>
				<h3 className={styles.settingsListOperations__title}>Суммы</h3>

				<div className={styles['settingsListOperations__amounts-checkbox-wrapper']}>
					<Controller
						name='amounts.showSelectedOperations'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать выбранные операции'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='amounts.showAmountArrivals'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать сумму приходов'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='amounts.showAmountDifference'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать сумму разницы'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='amounts.showAmountMovements'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать сумму перемещений'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>

					<Controller
						name='amounts.showAmountExpenses'
						control={control}
						render={({ field }) => (
							<CheckBox
								label='Показывать сумму расходов'
								checked={field.value}
								onChange={(isChecked) => field.onChange(isChecked)}
							/>
						)}
					/>
				</div>
			</div>

			<h3 className={styles.settingsListOperations__title}>Сортировка и фильтры списка операций</h3>
			<Controller
				name='filterListOperations'
				control={control}
				render={({ field }) => (
					<fieldset className={styles['settingsListOperations__table-columns-filter']}>
						<RadioButton
							id='notStoreFilterSettings'
							label='Не хранить настройки фильтров'
							name={field.name}
							value='notStoreFilterSettings'
							checked={field.value === 'notStoreFilterSettings'}
							onChange={() => field.onChange('notStoreFilterSettings')}
						/>
						<RadioButton
							id='saveSettingsUntilReboot'
							label='Хранить настройки до перезагрузки'
							value='saveSettingsUntilReboot'
							checked={field.value === 'saveSettingsUntilReboot'}
							onChange={() => field.onChange('saveSettingsUntilReboot')}
						/>
						<RadioButton
							id='saveSettingsBeforeChanging'
							label='Хранить настройки до изменения'
							value='saveSettingsBeforeChanging'
							checked={field.value === 'saveSettingsBeforeChanging'}
							onChange={() => field.onChange('saveSettingsBeforeChanging')}
						/>
					</fieldset>
				)}
			/>

			<Button
				mode='primary'
				type='submit'
				label='Применить'
				disabled={!selectFilterListOperations}
			/>
		</form>
	)
}
