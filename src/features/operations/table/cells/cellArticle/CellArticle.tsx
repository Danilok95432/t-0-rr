import type { CustomCellRendererProps } from 'ag-grid-react'

import styles from './cell-article.module.scss'
import classNames from 'classnames'

interface ICellArticleParams extends CustomCellRendererProps {
	value: {
		article: string
		subArticle: string
	}
}

export const CellArticle = ({ value }: ICellArticleParams) => {
	const positionTitle = value.subArticle === ''

	return (
		<>
			<p className={classNames(styles.titleArticle, positionTitle ? styles.center : styles.top)}>
				{value.article}
			</p>
			<p className={styles.subtitleArticle}>{value.subArticle}</p>
		</>
	)
}
