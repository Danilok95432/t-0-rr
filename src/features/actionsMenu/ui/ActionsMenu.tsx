import { useLocation } from 'react-router'
import { IActionItem } from '../types'

import { ActionButton } from '../components/ActionButton'
import { useActionMainItems } from '../hooks/useActionMainItems'
import { useActionsSupportItems } from '../hooks/useActionsSupportItems'

import styles from './actions-menu.module.scss'

export const ActionsMenu = () => {
	const path = useLocation().pathname.substring(1).split('/')[0]

	const actionsMainList = useActionMainItems()
	const actionsSupportList = useActionsSupportItems()

	const isShowAction = (action: IActionItem) => {
		if (action.showOnPaths && !action.showOnPaths.includes(path)) {
			return false
		}
		return true
	}

	return (
		<div className={styles.actions}>
			<ul className={styles.list}>
				{actionsMainList.map(
					(action) =>
						isShowAction(action) && (
							<li className={styles.item} key={action.id}>
								<ActionButton action={action} />
							</li>
						)
				)}
			</ul>

			<ul className={styles.list}>
				{actionsSupportList.map((action) => (
					<li className={styles.item} key={action.id}>
						<ActionButton action={action} />
					</li>
				))}
			</ul>
		</div>
	)
}
