import { Link } from 'react-router'

import styles from './logo.module.scss'

export const Logo = () => {
	return <Link to='/' className={styles.logo} aria-label='Главная' title='Главная' />
}
