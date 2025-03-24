import { FC } from 'react'

import styles from './total-info.module.scss'

interface TotalInfoProps {
	children?: React.ReactNode
}

export const TotalInfo: FC<TotalInfoProps> = ({ children }) => {
	return <div className={styles['total-info']}>{children}</div>
}
