import { Header } from '@/components/Header'
import { AppRouter } from '@/routes/AppRouter'

import styles from './app-layout.module.scss'

export const AppLayout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<AppRouter />
		</div>
	)
}
