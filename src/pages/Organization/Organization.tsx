import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { ElementPageLayout } from '@/layouts/ElementPageLayout'

import styles from './organization.module.scss'

export const Organization = () => {
	return (
		<ElementPageLayout>
			<h3 className={styles.title}>Основные данные организации</h3>
			<div className={styles.mainDataOrganization}>
				<Input id='name' label='Название организации' hasResetIcon disabled />
				<Input id='inn' label='ИНН' hasResetIcon disabled />
				<Input id='ogrn' label='ОРГН / ОГРНИП' hasResetIcon disabled />
				<TextArea id='fullName' label='Полное наименование организации' disabled />
				<TextArea id='legalAddress' label='Юридический адрес организации' disabled />
				<TextArea id='employeesComment' label='Комментарий сотрудника' disabled />

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

			<h3 className={styles.title}>Счета организации</h3>
			<ul className={styles.accounts}>
				<li>
					<Input id='nameAccount' label='Название счёта' />
					<Input id='nameAccount' label='Банк' />
					<Input id='nameAccount' label='БИК' />
					<Input id='nameAccount' label='Расчетный счёт' />
					<Input id='nameAccount' label='Тип счёта' />
					<TextArea label='Комментарий' />
				</li>
			</ul>
		</ElementPageLayout>
	)
}
