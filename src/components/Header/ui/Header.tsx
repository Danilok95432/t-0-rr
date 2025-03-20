import { Logo } from '@/components/Logo'
import { NavBar } from '@/components/NavBar'
import { Profile } from '@/components/Profile'

import styles from './header.module.scss'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<NavBar />
			<Profile />
		</header>
	)
}
