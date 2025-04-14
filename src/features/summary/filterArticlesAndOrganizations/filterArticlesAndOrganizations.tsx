import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TFormFilterArticlesAndOrganizations } from '@/shared/types/forms'

import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'

import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { CheckBox } from '@/shared/ui/CheckBox'

import styles from './filtersArtAndOrg.module.scss'
import { organizations } from '@/mock/addOperation'
import { dateOptions } from '@/mock/selectOptionTest'

export const FilterArticlesAndOrganizations = () => {
	const { handleCloseFilterMenu } = useFiltersMenu()

	const { control, handleSubmit, reset } = useForm<TFormFilterArticlesAndOrganizations>({
		defaultValues: {
			date: '',
			organization: '',
			case: '',
			counterparty: '',
			rememberChoice: false,
		},
	})

	const onSubmit: SubmitHandler<TFormFilterArticlesAndOrganizations> = (data) => {
		console.log(data)
		handleCloseFilterMenu()
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.filterArtAndOrgs}>
			<Controller
				name='date'
				control={control}
				render={({ field }) => (
					<SelectC
						options={dateOptions}
						values={
							field.value
								? [{ value: field.value, label: field.value }]
								: [{ value: '', label: 'От и до' }]
						}
						label='Диапазон дат одной колонки'
						onChange={field.onChange}
					/>
				)}
			/>

			<Controller
				name='organization'
				control={control}
				render={({ field }) => (
					<SelectC
						options={organizations}
						values={field.value ? [{ value: field.value, label: field.value }] : []}
						label='Организации'
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
				name='counterparty'
				control={control}
				render={({ field }) => (
					<SelectC
						options={[]}
						values={field.value ? [{ value: field.value, label: field.value }] : []}
						label='Контрагент'
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
