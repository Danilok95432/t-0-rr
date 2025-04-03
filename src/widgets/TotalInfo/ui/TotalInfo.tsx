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
					<span className={classNames(styles.value, { [styles[`${el.id}-value`]]: el.id })}>
						{el.value}
					</span>
				</div>
			))}
		</div>
	)
}
