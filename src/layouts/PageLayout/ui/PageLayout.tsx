import { FC } from 'react'
import { IPageLayoutProps } from '@/types/page-layout'

import { TotalInfo } from '@/components/TotalInfo'
import { Input } from '@/components/Input'

import styles from './page-layout.module.scss'

export const PageLayout: FC<IPageLayoutProps> = ({ title, totalInfoData, children }) => {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>

				<Input
					id='operations-search'
					placeholder='Искать по наименованию..'
					hasIcon
					className={styles.input}
					onChange={(e) => {
						console.log(e.target.value)
					}}
				/>

				<TotalInfo totalInfo={totalInfoData} />
			</div>

			<div className={styles.content}>{children}</div>
		</section>
	)
}
