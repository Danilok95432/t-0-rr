import { FC } from 'react'

import styles from './actions-menu.module.scss'
import { Button } from '@/components/Button'

interface ActionsMenuProps {
	toggleFilterMenu?: () => void
}

export const ActionsMenu: FC<ActionsMenuProps> = ({ toggleFilterMenu }) => {
	return (
		<div className={styles['actions-menu']}>
			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<Button id='add' mode='clear' className={styles['actions-menu__button-add']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<Button
						mode='clear'
						className={styles['actions-menu__button-search']}
						onClick={toggleFilterMenu}
					/>
				</li>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-import']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-download']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-graph']} />
				</li>
			</ul>

			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-mail']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-faq']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-settings']} />
				</li>
			</ul>
		</div>
	)
}
