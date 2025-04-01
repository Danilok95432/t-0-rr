import { FC } from 'react'
import { Link } from 'react-router'
import { IElementPageLayoutProps } from '@/types/page-layout'

import styles from './elementPageLayout.module.scss'

export const ElementPageLayout: FC<IElementPageLayoutProps> = ({ children }) => {
	return (
		<section className={styles.section}>
			<Link to={'/organizations'} className={styles.link}>
				Вернуться к списку организаций
			</Link>

			<h2 className={styles.title}>Название организации</h2>

			<div className={styles.content}>{children}</div>
		</section>
	)
}
