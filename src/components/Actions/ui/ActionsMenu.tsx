import { useLocation } from 'react-router'
import { useFiltersMenu } from '@/hooks/useFiltersMenu'
import { useModal } from '@/hooks/useModal'

import { Button } from '@/components/Button'

import styles from './actions-menu.module.scss'

export const ActionsMenu = () => {
	const { handleOpenFilterMenu } = useFiltersMenu()
	const { handleOpenModal } = useModal()
	const path = useLocation().pathname.substring(1).split('/')[0]

	return (
		<div className={styles['actions-menu']}>
			<ul className={styles['actions-menu__list']}>
				{path === 'organization' && (
					<li className={styles['actions-menu__item']}>
						<Button
							id='editing'
							mode='clear'
							className={styles['actions-menu__button-editing']}
							onClick={(event) => handleOpenModal(event)}
						/>
					</li>
				)}

				<li className={styles['actions-menu__item']}>
					<Button
						id='add'
						mode='clear'
						className={styles['actions-menu__button-add']}
						onClick={(event) => handleOpenModal(event)}
					/>
				</li>

				{path === 'operations' && (
					<li className={styles['actions-menu__item']}>
						<Button
							mode='clear'
							className={styles['actions-menu__button-search']}
							onClick={handleOpenFilterMenu}
						/>
					</li>
				)}

				{path === 'operations' && (
					<li className={styles['actions-menu__item']}>
						<Button
							id='upload'
							mode='clear'
							className={styles['actions-menu__button-import']}
							onClick={(event) => handleOpenModal(event)}
						/>
					</li>
				)}

				{path !== 'organization' && (
					<li className={styles['actions-menu__item']}>
						<Button
							id='unload'
							mode='clear'
							className={styles['actions-menu__button-download']}
							onClick={(event) => handleOpenModal(event)}
						/>
					</li>
				)}

				{path === 'operations' && (
					<li className={styles['actions-menu__item']}>
						<Button mode='clear' className={styles['actions-menu__button-graph']} />
					</li>
				)}
			</ul>

			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-mail']} />
				</li>

				<li className={styles['actions-menu__item']}>
					<Button mode='clear' className={styles['actions-menu__button-faq']} />
				</li>

				<li className={styles['actions-menu__item']}>
					<Button
						id='settings'
						mode='clear'
						className={styles['actions-menu__button-settings']}
						onClick={(event) => handleOpenModal(event)}
					/>
				</li>
			</ul>
		</div>
	)
}
