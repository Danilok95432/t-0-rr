import { NavLink } from 'react-router'
import { navBarItems } from '@/mock/navBar-items'

import styles from './navBar.module.scss'

export const NavBar = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav__list}>
				{navBarItems.map((navItem) => (
					<li className={styles.item} key={navItem.id}>
						<NavLink
							to={navItem.href}
							aria-label={navItem.title}
							title={navItem.title}
							className={styles.nav__link}
						>
							{navItem.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
