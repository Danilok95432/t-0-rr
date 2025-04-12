import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TFormCasesAndDeals } from '@/shared/types/forms'

import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'

import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'

import styles from './filterCaseAndDeals.module.scss'

export const FilterCaseAndDeals = () => {
	const { handleCloseFilterMenu } = useFiltersMenu()

	const { control, handleSubmit, reset } = useForm<TFormCasesAndDeals>({})

	const onSubmit: SubmitHandler<TFormCasesAndDeals> = (data) => {
		console.log(data)
		reset()
		handleCloseFilterMenu()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.filterCaseAndDeals}>
			<Controller
				name='date'
				control={control}
				render={({ field }) => (
					<SelectC
						options={[]}
						values={field.value ? [{ value: field.value, label: field.value }] : []}
						label='Диапазон дат одной колонки'
						placeholder='От и до'
						onChange={field.onChange}
					/>
				)}
			/>

			<Controller
				name='case'
				control={control}
				render={({ field }) => (
					<SelectC
						options={[]}
						values={field.value ? [{ value: field.value, label: field.value }] : []}
						label='Кейсы'
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
		</form>
	)
}
