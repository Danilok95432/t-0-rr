import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewAccount } from '@/features/accounts/newAccount'
import { accountsDef } from '@/features/accounts/table/config/accountsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { accountsData } from '@/mock/accounts-data'

const AccountsContent = () => {
	const { buttonId } = useModal()
	const { value } = useQuickFilter()

	return (
		<ListLayout title='Счета' totalInfoData={[]}>
			<GridTable columnDefinitions={accountsDef} rowData={accountsData} quickFilterText={value} />

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'add' && (
					<Modal title='Новый счёт'>
						<NewAccount />
					</Modal>
				)}
			</AnimatePresence>
		</ListLayout>
	)
}

export default AccountsContent
