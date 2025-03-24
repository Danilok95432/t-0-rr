import { Modal } from '@/components/Modal'
import { GridTable } from '@/components/GridTable'

import styles from './operations.module.scss'

export const Operations = () => {
	return (
		<section className={styles.operations}>
			<div className={styles.operations__header}>
				<h2 className={styles.title}>Операции</h2>

				<input type='text' name='operations-search' id='operations-search' />

				<div className={styles.operations__info}>
					<span>Выбранные операции (1363): </span>
					<span>Перемещения (53:): 220 000 088.00 ₽</span>
					<span>Приход (233): + 56 118 627.40 ₽</span>
					<span>Расход (877): - 43 343 953.55 ₽</span>
					<span>Разница: + 12 774 673.85 ₽</span>
				</div>
			</div>
			<div className={styles.content}>
				<GridTable />
			</div>

			<Modal title='Новая операция'>Тут форма добавления новой операции</Modal>
		</section>
	)
}
