import classNames from 'classnames'

import { useFilterMenu } from '../model/useFilterMenu'

import { Select } from '@/components/Select'
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
} from '../mock/selectOptionTest' /* тест */

export const FilterMenu = () => {
	const { isOpenFiltersMenu, handleClose } = useFilterMenu()

	return (
		<div className={styles.filter}>
			<div
				className={classNames(styles.filter__overlay, {
					[styles.isOpen]: isOpenFiltersMenu,
				})}
			>
				<div
					className={classNames(styles.filter__content, {
						[styles.isOpen]: isOpenFiltersMenu,
					})}
				>
					<form action='#' className={styles.filter__form}>
						<div className={styles['filter__content-top']}>
							<Select
								options={dateOptions}
								label='Диапазон дат'
								placeholder='От и до'
								className={styles.select_date}
							/>
							<Select options={organizationOptions} label='Организации' />
							<Select options={counterpartiesOptions} label='Контрагент' />
							<Select options={directionsOptions} label='Направления' />
							<Select options={articleOptions} label='Статья и подстатья' />
						</div>

						<div className={styles['filter__content-bottom']}>
							<Select options={articleOptions} label='Label' />
							<CheckBox label='Запомнить выбор' />

							<div className={styles['filter__buttons-wrapper']}>
								<Button mode='primary' label='Применить' />
								<Button mode='secondary' label='Сбросить фильтр' />
							</div>
						</div>
					</form>

					<Button
						mode='clear'
						className={styles.filter__close}
						icon={<Icon iconId='close' />}
						onClick={handleClose}
					/>
				</div>
			</div>
		</div>
	)
}
