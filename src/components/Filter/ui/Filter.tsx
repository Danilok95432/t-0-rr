import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './filter.module.scss'
import { CheckBox } from '@/components/CheckBox'

export const Filter = () => {
	return (
		<div className={styles.filter}>
			<div className={styles.filter__overlay}>
				<div className={styles.filter__content}>
					<form action='#' className={styles.filter__form}>
						<div className={styles['filter__content-top']}>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Диапазон дат
								</label>
								<select name='' id='' className={styles.date}>
									<option>От и до</option>
									<option value=''>Неделя</option>
									<option value=''>Месяц</option>
									<option value=''>Год</option>
								</select>
							</div>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Организации
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>МЦАИ ООО</option>
									<option value=''>ТАУ НПО ООО</option>
								</select>
							</div>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Счёта организации
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>МЦАИ ООО</option>
									<option value=''>ТАУ НПО ООО</option>
								</select>
							</div>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Контрагент
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>ООО Рога и Копыта (355988882230)</option>
									<option value=''>ООО Рога2 и Копыта2 (11111111111)</option>
								</select>
							</div>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Направления
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>Приход</option>
									<option value=''>Приход</option>
									<option value=''>Перемещение</option>
								</select>
							</div>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Статья и подстатья
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>Заработная плата</option>
								</select>
							</div>
						</div>

						<div className={styles['filter__content-bottom']}>
							<div className={styles['filter__select-wrapper']}>
								<label htmlFor='' className={styles['filter__select-label']}>
									Статья и подстатья
								</label>
								<select name='' id='' className={styles.date}>
									<option></option>
									<option value=''>Заработная плата</option>
								</select>
							</div>

							<CheckBox label='Запомнить выбор' />

							<div className={styles['filter__buttons-wrapper']}>
								<Button mode='primary' label='Применить' />
								<Button mode='secondary' label='Сбросить фильтр' />
							</div>
						</div>
					</form>
				</div>

				<Button mode='clear' className={styles.filter__close} icon={<Icon iconId='close' />} />
			</div>
		</div>
	)
}
