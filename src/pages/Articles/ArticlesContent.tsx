import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { articleArrivalDef } from '@/features/articles/table/config/articleArrivalDef'
import { articleExpenseDef } from '@/features/articles/table/config/articleExpenseDef'
import { NewArticle } from '@/features/articles/newArticle'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

import styles from './articles.module.scss'
//
import { articleArrivalData } from '@/mock/articleArrival-data'
import { articleExpenseData } from '@/mock/articleExpense-data'
//

const ArticlesContent = () => {
	const { buttonId } = useModal()
	const { value } = useQuickFilter()

	return (
		<ListLayout title='Статьи'>
			<div className={styles.articlesPage}>
				<div className={styles.left}>
					<h3 className={styles.title}>Статьи прихода</h3>

					<GridTable
						columnDefinitions={articleArrivalDef}
						rowData={articleArrivalData}
						checkboxHidden={false}
						quickFilterText={value}
					/>
				</div>

				<div className={styles.right}>
					<h3 className={styles.title}>Статьи расхода</h3>

					<GridTable
						columnDefinitions={articleExpenseDef}
						rowData={articleExpenseData}
						checkboxHidden={false}
						quickFilterText={value}
					/>
				</div>
			</div>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'add' && (
					<Modal title='Новая статья'>
						<NewArticle />
					</Modal>
				)}
			</AnimatePresence>
		</ListLayout>
	)
}

export default ArticlesContent
