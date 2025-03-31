import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './profile.module.scss'

export const Profile = () => {
	return (
		<div className={styles.profile}>
			<a href='##' className={styles.profile__link} aria-label='Профиль' title='Профиль'>
				Анатолий Тедорадзе
			</a>

			<Button
				type='button'
				className={styles.profile__button}
				icon={<Icon iconId='exit' width='24px' height='24px' />}
				mode='clear'
				aria-label='Выйти'
			/>
		</div>
	)
}
