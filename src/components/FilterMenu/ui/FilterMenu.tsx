import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { TFormFilterMenu } from '@/types/filterMenu'

import { useFiltersMenu } from '@/hooks/useFiltersMenu'

import { SelectC } from '@/components/Select'
import { Button } from '@/components/Button'
import { CheckBox } from '@/components/CheckBox'
import { Icon } from '@/components/Icon'

import styles from './filter-menu.module.scss'
//
import {
	articleOptions,
	counterpartiesOptions,
	dateOptions,
	directionsOptions,
	organizationOptions,
} from '@/mock/selectOptionTest' /* тест */

export const FilterMenu = () => {
	const { isOpenFiltersMenu, handleCloseFilterMenu } = useFiltersMenu()
	const { control, handleSubmit, reset } = useForm<TFormFilterMenu>({
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

	// Закрыть меню на кнопку Esc
	useEffect(() => {
		if (isOpenFiltersMenu) {
			const closeByEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					handleCloseFilterMenu()
				}
			}
			document.addEventListener('keydown', closeByEscape)

			return () => document.removeEventListener('keydown', closeByEscape)
		}
	}, [isOpenFiltersMenu, handleCloseFilterMenu])

	const onSubmit: SubmitHandler<TFormFilterMenu> = (data) => {
		console.log(data)
		reset()
		handleCloseFilterMenu()
	}

	return (
		<div className={styles.filter}>
			<div
				className={classNames(styles.overlay, {
					[styles.isOpen]: isOpenFiltersMenu,
				})}
			>
				<div
					className={classNames(styles.content, {
						[styles.isOpen]: isOpenFiltersMenu,
					})}
				>
					<form action='#' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.top}>
							<Controller
								name='dateRange'
								control={control}
								render={({ field }) => (
									<SelectC
										options={dateOptions}
										values={field.value ? [{ value: field.value }] : []}
										label='Диапазон дат'
										placeholder='От и до'
										onChange={field.onChange}
									/>
								)}
							/>

							<Controller
								name='organization'
								control={control}
								render={({ field }) => (
									<SelectC
										options={organizationOptions}
										values={field.value ? [{ value: field.value }] : []}
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
										values={field.value ? [{ value: field.value }] : []}
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
										values={field.value ? [{ value: field.value }] : []}
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
										values={field.value ? [{ value: field.value }] : []}
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
										values={field.value ? [{ value: field.value }] : []}
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
										values={field.value ? [{ value: field.value }] : []}
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

					<Button
						mode='clear'
						className={styles.close}
						icon={<Icon iconId='close' width='24px' height='24px' />}
						onClick={handleCloseFilterMenu}
					/>
				</div>
			</div>
		</div>
	)
}
