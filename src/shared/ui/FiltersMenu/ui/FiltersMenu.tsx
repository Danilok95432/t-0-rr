import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { IFiltersMenuProps } from '../types'

import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import styles from './filters-menu.module.scss'

export const FiltersMenu: FC<IFiltersMenuProps> = ({ children }) => {
	const { isOpenFiltersMenu, handleCloseFilterMenu } = useFiltersMenu()
	const contentRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		if (isOpenFiltersMenu) {
			const handleClickOutside = (event: MouseEvent) => {
				if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
					handleCloseFilterMenu()
				}
			}

			const timer = setTimeout(() => {
				document.addEventListener('mousedown', handleClickOutside)
			}, 0)

			return () => {
				clearTimeout(timer)
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isOpenFiltersMenu, handleCloseFilterMenu])

	return (
		<div className={styles.filters}>
			<div className={classNames(styles.overlay, { [styles.isOpen]: isOpenFiltersMenu })}>
				<div 
					ref={contentRef}
					className={classNames(styles.content, { [styles.isOpen]: isOpenFiltersMenu })}
				>
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