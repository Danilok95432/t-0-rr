import { Icon } from '@/components/Icon'

import styles from './profile.module.scss'
import { Button } from '@/components/Button'

export const Profile = () => {
	return (
		<div className={styles.profile}>
			<a href='##' className={styles.profile__link} aria-label='Профиль' title='Профиль'>
				Анатолий Тедорадзе
			</a>
			<Button
				type='button'
				className={styles.profile__button}
				icon={<Icon iconId='exit' />}
				mode='clear'
				aria-label='Выйти'
			/>
		</div>
	)
}
