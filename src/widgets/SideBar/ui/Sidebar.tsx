import { ActionsMenu } from '@/features/actionsMenu'

import styles from './sidebar.module.scss'

export const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<ActionsMenu />
		</aside>
	)
}
