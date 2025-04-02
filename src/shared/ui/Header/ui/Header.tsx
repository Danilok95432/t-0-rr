import { NavBar } from '@/widgets/NavBar'
import { Profile } from '@/widgets/Profile'
import { Logo } from '@/shared/ui/Logo'

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
