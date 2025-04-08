import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { IFiltersMenuProps } from '../types'

import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import styles from './filters-menu.module.scss'

export const FiltersMenu: FC<IFiltersMenuProps> = ({ children }) => {
	const { isOpenFiltersMenu, handleCloseFilterMenu } = useFiltersMenu()

	// Обработчик Esc
	useEffect(() => {
		if (isOpenFiltersMenu) {
			const closeByEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					handleCloseFilterMenu()
				}
			}
			document.addEventListener('keydown', closeByEscape)

			return () => document.removeEventListener('keydown', closeByEscape)
		}
	}, [isOpenFiltersMenu, handleCloseFilterMenu])

	return (
		<div className={styles.filters}>
			<div className={classNames(styles.overlay, { [styles.isOpen]: isOpenFiltersMenu })}>
				<div className={classNames(styles.content, { [styles.isOpen]: isOpenFiltersMenu })}>
					{children}

					<Button
						mode='clear'
						className={styles.close}
						icon={<Icon iconId='close' width='24px' height='24px' />}
						onClick={handleCloseFilterMenu}
					/>
				</div>
			</div>
		</div>
	)
}
