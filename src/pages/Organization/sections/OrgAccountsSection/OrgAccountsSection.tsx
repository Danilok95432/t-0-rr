import { CardAccount } from '@/widgets/CardAccount'
import { Badge } from '@/shared/ui/Badge'

import styles from './orgAccounts.module.scss'

export const OrgAccountsSection = () => {
	const invoiceCounter = '5' /* будем получать динамически*/

	return (
		<section className={styles.orgAccounts}>
			<div className={styles.inner}>
				<h3 className={styles.title}>Счета организации</h3>
				<Badge mode='default' label={invoiceCounter} className={styles.badge} />
			</div>

			<ul className={styles.list}>
				<CardAccount />
				<CardAccount />
			</ul>
		</section>
	)
}
