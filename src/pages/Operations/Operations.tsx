import { PageLayout } from '@/layouts/PageLayout'
import { GridTable } from '@/components/GridTable'
import { Modal } from '@/components/Modal'
import { NewOperation } from '@/components/Forms/NewOperation'

import { operationsTotalInfo } from '@/mock/operations-total-info'

import styles from './operations.module.scss'

export const Operations = () => {
	return (
		<PageLayout title='Операции' totalInfoData={operationsTotalInfo}>
			<div className={styles.content}>
				<GridTable />
			</div>

			<Modal title='Новая операция'>
				<NewOperation />
			</Modal>
		</PageLayout>
	)
}
