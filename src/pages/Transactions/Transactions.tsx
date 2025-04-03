import { useModal } from '@/hooks/useModal'
import { ListLayout } from '@/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { transactionsDef } from '@/features/table/configs/transactionsDef'
import { NewTransaction } from '@/components/Forms/NewTransaction'
import { transactionsData } from '@/mock/transactions-data'

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
