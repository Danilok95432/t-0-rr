import { TotalInfo } from '@/widgets/TotalInfo'
import styles from './movements.module.scss'
import { FC } from 'react'

interface MovementsAccountProps {
  transferInfo: {
		expence_org_transfers: string
		income_org_transfers: string
	}
}

export const MovementsAccount:FC<MovementsAccountProps> = ({ transferInfo }) => {
	const movements = [
		{ name: 'Входящие перемещения', value: transferInfo.income_org_transfers, id: 'coming' },
		{ name: 'Исходящие перемещения', value: transferInfo.expence_org_transfers, id: 'expenditure' },
	]
	return (
		<section className={styles.movementsAccount}>
			<h3 className={styles.title}>Перемещения по счёту внутри организации</h3>
			<TotalInfo totalInfo={movements} className={styles.movements} />
		</section>
	)
}
