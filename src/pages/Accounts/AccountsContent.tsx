import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewAccount } from '@/features/accounts/newAccount'
import { accountsDef } from '@/features/accounts/table/config/accountsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { useGetAllAccountsQuery } from '@/features/accounts/api/accountsApi'

const AccountsContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()

  const { data: accountsData } = useGetAllAccountsQuery()

  return (
    <ListLayout
      title='Счета'
      totalInfoData={[
        {
          name: 'Всего счетов',
          value: '24',
        },
      ]}
    >
      <GridTable
        columnDefinitions={accountsDef}
        rowData={accountsData?.accounts}
        quickFilterText={value}
        checkboxHidden={false}
      />

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
