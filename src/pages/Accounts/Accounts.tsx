import { accountsDef } from '@/features/table/configs/accountsDef'
import { useModal } from '@/features/modal/hooks/useModal'

import { ListLayout } from '@/layouts/ListLayout'
import { NewAccount } from '@/components/Forms/NewAccount'
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
