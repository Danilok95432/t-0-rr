import { FC } from 'react'
import { Link } from 'react-router'
import { IItemLayoutProps } from '@/shared/types/page-layout'

import styles from './itemLayout.module.scss'

export const ItemLayout: FC<IItemLayoutProps> = ({
  children,
  labelButton,
  title,
  pathToBack,
  isStandart,
	customText,
	customLength,
}) => {
  if (isStandart) {
    return (
      <section className={styles.section}>
        <Link to={`/${pathToBack || ''}`} className={styles.link}>
          {labelButton}
        </Link>
				<div className={styles.sectionRow}>
					<h2 className={styles.title}>{title || 'Название'}</h2>
					<div className={styles.totalInfo}>
						<span>{customText}</span>
						<span>{customLength}</span>
					</div>
				</div>

        <div className={styles.content}>{children}</div>
      </section>
    )
  }
  return (
    <section className={styles.section}>
      <Link to={`/${pathToBack || ''}`} className={styles.link}>
        {labelButton}
      </Link>

      <h2 className={styles.title}>{title || 'Название'}</h2>

      <div className={styles.content}>{children}</div>
    </section>
  )
}
