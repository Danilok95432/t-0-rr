import { TotalInfo } from '@/widgets/TotalInfo'
import styles from './movements.module.scss'

export const MovementsAccount = () => {
	const movements = [
		{ name: 'Входящие перемещения', value: '+ 56 118 627.40 ₽', id: 'coming' },
		{ name: 'Исходящие перемещения', value: '- 43 343 953.55 ₽', id: 'expenditure' },
	]
	return (
		<section className={styles.movementsAccount}>
			<h3 className={styles.title}>Перемещения по счёту внутри организации</h3>
			<TotalInfo totalInfo={movements} className={styles.movements} />
		</section>
	)
}
