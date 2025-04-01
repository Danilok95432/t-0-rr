import { FC, useState } from 'react'
import { IPageLayoutProps } from '@/types/page-layout'

import { TotalInfo } from '@/components/TotalInfo'
import { Input } from '@/components/Input'

import styles from './page-layout.module.scss'

export const PageLayout: FC<IPageLayoutProps> = ({ title, totalInfoData, children }) => {
	const [value, setValue] = useState('')

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>

				<Input
					id='operations-search'
					placeholder='Искать по наименованию..'
					hasIcon
					hasResetIcon
					className={styles.input}
					value={value}
					onChange={(event) => {
						setValue(event?.currentTarget.value ?? '')
					}}
				/>

				<TotalInfo totalInfo={totalInfoData} />
			</div>

			<div className={styles.content}>{children}</div>
		</section>
	)
}
