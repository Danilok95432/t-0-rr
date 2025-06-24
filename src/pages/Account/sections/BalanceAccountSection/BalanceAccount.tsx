import { TotalInfo } from '@/widgets/TotalInfo'
import styles from './balance-account.module.scss'
import { FC } from 'react'

interface BalanceAccountProps {
  balanceInfo: {
		prihod: string
		rashod: string
		balance: string
	}
}

export const BalanceAccount:FC<BalanceAccountProps> = ({ balanceInfo }) => {
	const balance = [
		{ name: 'Приход за всё время', value: balanceInfo.prihod, id: 'coming' },
		{ name: 'Расход за всё время', value: balanceInfo.rashod, id: 'expenditure' },
		{ name: 'Актуальный баланс', value: balanceInfo.balance, id: 'movements' },
	]
	return (
		<section className={styles.balanceAccount}>
			<h3 className={styles.title}>Баланс счёта</h3>
			<TotalInfo totalInfo={balance} className={styles.balance} />
		</section>
	)
}
