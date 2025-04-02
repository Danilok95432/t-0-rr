import { CardCounterparty } from '@/components/CardCounterparty'
import { Badge } from '@/components/Badge'

import styles from './accountsCounterparty.module.scss'

export const AccountsCounterparty = () => {
	const invoiceCounter = '5' /* будем получать динамически*/

	return (
		<section className={styles.accountsCounterparty}>
			<div className={styles.inner}>
				<h3 className={styles.title}>Счета организации</h3>
				<Badge mode='default' label={invoiceCounter} classname={styles.badge} />
			</div>

			<ul className={styles.list}>
				<CardCounterparty />
			</ul>
		</section>
	)
}
