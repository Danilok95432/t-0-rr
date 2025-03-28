import { FC } from 'react'
import classNames from 'classnames'
import { ITotalInfoProps } from '@/types/total-info'

import styles from './total-info.module.scss'

export const TotalInfo: FC<ITotalInfoProps> = ({ totalInfo }) => {
	return (
		<div className={styles['total-info']}>
			{totalInfo?.map((el, index) => (
				<div className={styles.info} key={index}>
					{el.name}:
					<span className={classNames(styles.value, { [styles[`${el.id}-value`]]: el.id })}>
						{el.value}
					</span>
				</div>
			))}
		</div>
	)
}
