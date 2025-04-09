import { useModal } from '@/features/modal/hooks/useModal'
import { NewTransaction } from '@/features/transactions/newTransaction'
import { transactionsDef } from '@/features/transactions/table/config/transactionsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

//
import { transactionsData } from '@/mock/transactions-data'
//

const TransactionsContent = () => {
	const { buttonId } = useModal()
	const { value } = useQuickFilter()

	return (
		<ListLayout title='Сделки' totalInfoData={[]}>
			<GridTable
				columnDefinitions={transactionsDef}
				rowData={transactionsData}
				quickFilterText={value}
			/>

			{buttonId === 'add' && (
				<Modal title='Новая сделка'>
					<NewTransaction />
				</Modal>
			)}
		</ListLayout>
	)
}

export default TransactionsContent
