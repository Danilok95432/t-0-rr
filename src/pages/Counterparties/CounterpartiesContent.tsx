import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'

import { NewCounterparty } from '@/features/counterparties/newCounterparty'
import { counterpartiesDef } from '@/features/counterparties/table/config/counterpartiesDef'
import { useGetAllCounterpartiesQuery } from '@/features/counterparties/api/counterpartiesApi'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
//
// import { counterpartiesTotalInfo } from '@/mock/counterparties-total-info'
// import { counterpartiesData } from '@/mock/counterparties-data'
import { mapCounterparties } from '@/features/counterparties/lib/mapCounterparties'
import { Loader } from '@/shared/ui/Loader'
//

const CounterpartiesContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllCounterpartiesQuery()

  const counterparties = data?.map((el) => mapCounterparties(el))

  console.log(counterparties)

  return (
    <ListLayout
      title='Контрагенты'
      totalInfoData={[
        {
          name: 'Всего контрагентов',
          value: `${counterparties?.length}`,
        },
      ]}
    >
      {!counterparties ? (
        <Loader />
      ) : (
        <GridTable
          columnDefinitions={counterpartiesDef}
          rowData={counterparties}
          quickFilterText={value}
          checkboxHidden={false}
        />
      )}

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новый контрагент'>
            <NewCounterparty />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'unload' && (
          <Modal title='Выгрузка (экспорт) контрагента'>Выгрузка организаций</Modal>
        )}
      </AnimatePresence>
    </ListLayout>
  )
}

export default CounterpartiesContent
