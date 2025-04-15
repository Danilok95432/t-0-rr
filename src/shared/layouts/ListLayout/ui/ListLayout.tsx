import { FC } from 'react'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { IListLayoutProps } from '@/shared/types/page-layout'

import { TotalInfo } from '@/widgets/TotalInfo'
import { Input } from '@/shared/ui/Input'

import styles from './list-layout.module.scss'

export const ListLayout: FC<IListLayoutProps> = ({ title, totalInfoData, children }) => {
  const { value, handleChange } = useQuickFilter()

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <Input
          id='operations-search'
          label='Искать...'
          hasIconSearch
          hasResetIcon
          className={styles.input}
          value={value}
          onChange={handleChange}
        />

        {totalInfoData && <TotalInfo totalInfo={totalInfoData} />}
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  )
}
