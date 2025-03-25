import { FC } from 'react'
import { TotalInfo } from '@/components/TotalInfo'
import { Input } from '@/components/Input'

import styles from './page-layout.module.scss'

interface PageLayoutProps {
	title?: string
	totalInfoData?: Record<string, string>[]
	children?: React.ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ title, totalInfoData, children }) => {
	return (
		<section className={styles.section}>
			<div className={styles.section__header}>
				<h2 className={styles.title}>{title}</h2>

				<Input
					id='operations-search'
					placeholder='Искать по наименованию..'
					hasIcon
					className={styles.section__input}
				/>

				<TotalInfo>
					{totalInfoData?.map((el, index) => (
						<div className='' key={index}>
							{el.name}: <span>{el.value}</span>
						</div>
					))}
				</TotalInfo>
			</div>

			{children}
		</section>
	)
}
