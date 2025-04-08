import { FC } from 'react'
import classNames from 'classnames'

import styles from './loader.module.scss'

interface LoaderProps {
	className?: string
}

export const Loader: FC<LoaderProps> = ({ className = '' }) => {
	return (
		<div className={classNames(styles.loader, className)}>
			<div className={styles.spinner}></div>
		</div>
	)
}
