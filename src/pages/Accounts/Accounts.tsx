import { useModal } from '@/features/modal/hooks/useModal'
import { NewAccount } from '@/features/accounts/components/NewAccount'
import { accountsDef } from '@/features/accounts/accountsTable/config/accountsDef'

import { ListLayout } from '@/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'

import { accountsData } from '@/mock/accounts-data'

export const Accounts = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Счета' totalInfoData={[]}>
			<GridTable columnDefinitions={accountsDef} rowData={accountsData} />

			{buttonId === 'add' && (
				<Modal title='Новый счёт'>
					<NewAccount />
				</Modal>
			)}
		</ListLayout>
	)
}
