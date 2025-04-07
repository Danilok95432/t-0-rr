import { useModal } from '@/features/modal/hooks/useModal'
import { NewTransaction } from '@/features/transactions/newTransaction'
import { transactionsDef } from '@/features/transactions/table/config/transactionsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

//
import { transactionsData } from '@/mock/transactions-data'
//

export const Transactions = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Сделки' totalInfoData={[]}>
			<GridTable columnDefinitions={transactionsDef} rowData={transactionsData} />

			{buttonId === 'add' && (
				<Modal title='Новая сделка'>
					<NewTransaction />
				</Modal>
			)}
		</ListLayout>
	)
}
