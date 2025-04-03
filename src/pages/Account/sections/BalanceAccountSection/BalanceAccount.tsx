import { TotalInfo } from '@/widgets/TotalInfo'
import styles from './balance-account.module.scss'

export const BalanceAccount = () => {
	const balance = [
		{ name: 'Приход за всё время', value: '+ 56 118 627.40 ₽', id: 'coming' },
		{ name: 'Расход за всё время', value: '- 43 343 953.55 ₽', id: 'expenditure' },
		{ name: 'Актуальный баланс', value: '220 000 088.00 ₽', id: 'movements' },
	]
	return (
		<section className={styles.balanceAccount}>
			<h3 className={styles.title}>Баланс счёта</h3>
			<TotalInfo totalInfo={balance} className={styles.balance} />
		</section>
	)
}
