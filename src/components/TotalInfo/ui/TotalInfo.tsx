import { FC } from 'react'

import { ITotalInfoProps } from '@/types/total-info'

import styles from './total-info.module.scss'

export const TotalInfo: FC<ITotalInfoProps> = ({ children }) => {
	return <div className={styles['total-info']}>{children}</div>
}
