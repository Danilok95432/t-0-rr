import { useAppDispatch, useAppSelector } from '@/app/store/hooks/useRedux'
import { selectUser } from '@/features/auth/store/authSelectors'
import { logout } from '@/features/auth/store/authSlice'

import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import styles from './profile.module.scss'
import { useLogoutMutation } from '@/shared/api/authApi'

export const Profile = () => {
  const userName = useAppSelector(selectUser)?.username || ''
  const dispatch = useAppDispatch()
  const [logoutMutation] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      dispatch(logout())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.profile}>
      <a href='##' className={styles.profile__link} aria-label='Профиль' title='Профиль'>
        {userName}
      </a>

      <Button
        type='button'
        className={styles.profile__button}
        icon={<Icon iconId='exit' width='24px' height='24px' />}
        mode='clear'
        aria-label='Выйти'
        onClick={handleLogout}
      />
    </div>
  )
}
