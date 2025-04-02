import { Outlet } from 'react-router'

import { Sidebar } from '@/widgets/SideBar'

import styles from './content.module.scss'

export const Content = () => {
	return (
		<main className={styles.content}>
			<Sidebar />
			<Outlet />
		</main>
	)
}
