import { useFiltersMenu } from '@/hooks/useFiltersMenu'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/Button'

import styles from './actions-menu.module.scss'

export const ActionsMenu = () => {
	const { handleOpenFilterMenu } = useFiltersMenu()
	const { handleOpenModal } = useModal()

	return (
		<div className={styles['actions-menu']}>
			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<Button
						id='add'
						mode='clear'
						className={styles['actions-menu__button-add']}
						onClick={handleOpenModal}
					/>
				</li>
				<li className={styles['actions-menu__item']}>
					<Button
						mode='clear'
						className={styles['actions-menu__button-search']}
						onClick={handleOpenFilterMenu}
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
