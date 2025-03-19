import { Icon } from '@/components/Icon'

import styles from './profile.module.scss'

export const Profile = () => {
	return (
		<div className={styles.profile}>
			<a href='##' className={styles.profile__link} aria-label='Профиль' title='Профиль'>
				Анатолий Тедорадзе
			</a>
			<button type='button' className={styles.profile__button} aria-label='Выйти'>
				<Icon iconId='exit' className={styles.profile__icon} />
			</button>
		</div>
	)
}
