import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TFormFilterOperationsMenu } from '@/shared/types/forms'

import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'

import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'

import styles from './filter-operations.module.scss'
//
import {
	articleOptions,
	counterpartiesOptions,
	dateOptions,
	directionsOptions,
	organizationOptions,
} from '@/mock/selectOptionTest' /* тест */

export const FilterOperations = () => {
	const { handleCloseFilterMenu } = useFiltersMenu()

	const { control, handleSubmit, reset } = useForm<TFormFilterOperationsMenu>({
		defaultValues: {
			dateRange: '' /* строка для теста, поменять на Date */,
			organization: '',
			accounts: '',
			counterparty: '',
			direction: '',
			case: '',
			article: '',
			rememberChoice: false,
		},
	})

	const onSubmit: SubmitHandler<TFormFilterOperationsMenu> = (data) => {
		console.log(data)
		handleCloseFilterMenu()
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.filterOperations}>
			<div className={styles.top}>
				<Controller
					name='dateRange'
					control={control}
					render={({ field }) => (
						<SelectC
							options={dateOptions}
							values={
								field.value
									? [{ value: field.value, label: field.value }]
									: [{ value: '', label: 'От и до' }]
							}
							label='Диапазон дат'
							onChange={field.onChange}
							className={styles.dateSelect}
						/>
					)}
				/>

				<Controller
					name='organization'
					control={control}
					render={({ field }) => (
						<SelectC
							options={organizationOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Организации'
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='accounts'
					control={control}
					render={({ field }) => (
						<SelectC
							options={organizationOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Счета организаций'
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='counterparty'
					control={control}
					render={({ field }) => (
						<SelectC
							options={counterpartiesOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Контрагент'
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='direction'
					control={control}
					render={({ field }) => (
						<SelectC
							options={directionsOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Направления'
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='article'
					control={control}
					render={({ field }) => (
						<SelectC
							options={articleOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Статья и подстатья'
							onChange={field.onChange}
						/>
					)}
				/>
			</div>

			<div className={styles.bottom}>
				<Controller
					name='case'
					control={control}
					render={({ field }) => (
						<SelectC
							options={articleOptions}
							values={field.value ? [{ value: field.value, label: field.value }] : []}
							label='Кейс и сделка'
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='rememberChoice'
					control={control}
					render={({ field }) => (
						<CheckBox
							label='Запомнить выбор'
							checked={field.value}
							onChange={(isChecked) => field.onChange(isChecked)}
						/>
					)}
				/>

				<div className={styles['buttons-wrapper']}>
					<Button mode='primary' label='Применить' type='submit' />
					<Button mode='secondary' label='Сбросить фильтр' type='reset' />
				</div>
			</div>
		</form>
	)
}
