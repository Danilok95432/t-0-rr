import { NavLink } from 'react-router'
import { navBarItems } from '@/mock/navBar-items'
import cn from 'classnames'

import styles from './navBar.module.scss'

export const NavBar = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{navBarItems.map((navItem) => (
					<li className={cn(styles.item, {[styles.leftMargin]: navItem.href === 'imports'})} key={navItem.id}>
						<NavLink
							to={navItem.href}
							aria-label={navItem.title}
							title={navItem.title}
							className={styles.link}
							data-text={navItem.title}
						>
							<span>{navItem.title}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
