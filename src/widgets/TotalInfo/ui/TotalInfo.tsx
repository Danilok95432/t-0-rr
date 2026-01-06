import { FC } from 'react'
import classNames from 'classnames'
import { ITotalInfoProps } from '../types'

import styles from './total-info.module.scss'

export const TotalInfo: FC<ITotalInfoProps> = ({ totalInfo, className }) => {
  return (
    <div className={classNames(styles['total-info'], className)}>
      {totalInfo?.map((el, index) => (
        <div className={styles.info} key={index}>
          {el.name}:
          <span
            className={classNames(
              styles.value,
              { [styles.comingValue]: el.name.includes('Приход') || el.name.includes('приход') },
              { [styles.expenditureValue]: el.name.includes('Расход') || el.name.includes('расход') },
							{ [styles.comingValue]: (el.name === 'Разница' || el.name === 'Актуальный баланс') && Number(el.value) > 0 },
							{ [styles.expenditureValue]: el.name === 'Разница' || el.name === 'Актуальный баланс' && Number(el.value) < 0 },
            )}
          >
            {el.value}
          </span>
        </div>
      ))}
    </div>
  )
}
