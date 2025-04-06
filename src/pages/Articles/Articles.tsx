import { useModal } from '@/features/modal/hooks/useModal'
import { articleArrivalDef } from '@/features/articles/table/config/articleArrivalDef'
import { articleExpenseDef } from '@/features/articles/table/config/articleExpenseDef'

import { ListLayout } from '@/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

import styles from './articles.module.scss'
//
import { articleArrivalData } from '@/mock/articleArrival-data'
import { articleExpenseData } from '@/mock/articleExpense-data'
//

export const Articles = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Статьи'>
			<div className={styles.articlesPage}>
				<div className={styles.left}>
					<h3 className={styles.title}>Статьи прихода</h3>

					<GridTable
						columnDefinitions={articleArrivalDef}
						rowData={articleArrivalData}
						checkboxHidden={false}
					/>
				</div>

				<div className={styles.right}>
					<h3 className={styles.title}>Статьи расхода</h3>

					<GridTable
						columnDefinitions={articleExpenseDef}
						rowData={articleExpenseData}
						checkboxHidden={false}
					/>
				</div>
			</div>

			{buttonId === 'add' && <Modal title='Новая статья'>Тут форма добавления новой статьи</Modal>}
		</ListLayout>
	)
}
