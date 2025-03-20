import { Header } from '@/components/Header'
import { AppRouter } from '@/routes/AppRouter'

import styles from './app-layout.module.scss'

export const AppLayout = () => {
	return (
		<div className={styles['app-layout']}>
			<Header />
			<AppRouter />
		</div>
	)
}
