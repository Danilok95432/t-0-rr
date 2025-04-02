import classNames from 'classnames'
import { useEditingMode } from '@/hooks/useEditingMode'

import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './orgMainData.module.scss'

export const OrgMainDataSection = () => {
	const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

	return (
		<section className={styles.orgMainData}>
			<h3 className={styles.title}>Основные данные организации</h3>

			<div className={styles.inner}>
				<Input
					id='name'
					label='Название организации'
					hasResetIcon
					disabled={!isEditingModeActive}
				/>

				<Input id='inn' label='ИНН' hasResetIcon disabled={!isEditingModeActive} />

				<Input id='ogrn' label='ОРГН / ОГРНИП' hasResetIcon disabled={!isEditingModeActive} />

				<TextArea
					id='fullName'
					label='Полное наименование организации'
					disabled={!isEditingModeActive}
				/>

				<TextArea
					id='legalAddress'
					label='Юридический адрес организации'
					disabled={!isEditingModeActive}
				/>

				<TextArea
					id='employeesComment'
					label='Комментарий сотрудника'
					disabled={!isEditingModeActive}
				/>

				<div className={styles.balance}>
					<h3 className={styles.balance_title}>Баланс организации</h3>

					<div className={styles.balance_body}>
						<span>Приход за всё время</span>
						<span className={styles.coming}>88 900 600 500.04 ₽</span>
						<span>Расход за всё время</span>
						<span className={styles.expenses}>88 900 600 500.04 ₽</span>
						<span>Разница за всё время</span>
						<span className={styles.difference}>88 900 600 500.04 ₽</span>
					</div>
				</div>
			</div>

			<div
				className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
			>
				<Button mode='primary' label='Сохранить изменения' onClick={handleDeactivateEditingMode} />
				<Button mode='secondary' label='Отменить' onClick={handleDeactivateEditingMode} />
			</div>
		</section>
	)
}
