import { Outlet } from 'react-router'

import { Header } from '@/shared/ui/Header'
import { Sidebar } from '@/widgets/SideBar'

import styles from './content.module.scss'

export const Content = () => {
  return (
    <>
      <Header />

      <main className={styles.content}>
        <Sidebar />
        <Outlet />
      </main>
    </>
  )
}
