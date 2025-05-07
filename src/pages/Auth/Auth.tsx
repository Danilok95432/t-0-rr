import { AuthForm } from '@/features/auth/authForm'

import styles from './auth-page.module.scss'

export const Auth = () => {
  return (
    <div className={styles.login}>
      <AuthForm />
    </div>
  )
}
