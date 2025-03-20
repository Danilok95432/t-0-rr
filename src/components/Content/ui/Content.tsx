import { Outlet } from 'react-router'
import { Sidebar } from '@/components/SideBar'

import styles from './content.module.scss'

export const Content = () => {
	return (
		<main className={styles.content}>
			<Sidebar />
			<Outlet />
		</main>
	)
}
