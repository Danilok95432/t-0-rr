import { FC } from 'react'
import { Link } from 'react-router'
import { IItemLayoutProps } from '@/shared/types/page-layout'

import styles from './itemLayout.module.scss'

export const ItemLayout: FC<IItemLayoutProps> = ({ children, labelButton, pathToBack }) => {
	return (
		<section className={styles.section}>
			<Link to={`/${pathToBack || ''}`} className={styles.link}>
				{labelButton}
			</Link>

			<h2 className={styles.title}>Название</h2>

			<div className={styles.content}>{children}</div>
		</section>
	)
}
