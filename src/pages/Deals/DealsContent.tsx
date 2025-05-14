import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewDeals } from '@/features/deals/newDeals'
import { dealsDef } from '@/features/deals/table/config/dealsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { useGetAllDealsQuery } from '@/features/deals/api/dealsApi'
import { mapDeals } from '@/features/deals/lib/mapDeals'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { Loader } from '@/shared/ui/Loader'

// import { transactionsData } from '@/mock/transactions-data'

const TransactionsContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllDealsQuery()

  const deals = data?.map((deal) => mapDeals(deal))

  return (
    <ListLayout
      title='Сделки'
      totalInfoData={[
        {
          name: 'Всего сделок',
          value: `${deals?.length}`,
        },
      ]}
    >
      {!deals ? (
        <Loader />
      ) : (
        <GridTable
          columnDefinitions={dealsDef}
          rowData={deals}
          quickFilterText={value}
          checkboxHidden={false}
        />
      )}

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новая сделка'>
            <NewDeals />
          </Modal>
        )}
      </AnimatePresence>
    </ListLayout>
  )
}

export default TransactionsContent
