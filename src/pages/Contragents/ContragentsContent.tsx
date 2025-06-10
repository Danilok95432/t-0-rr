import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'

import { NewContragent } from '@/features/contragents/newCounterparty'
import { contragentsDef } from '@/features/contragents/table/config/contragentsDef'
import { useGetAllContragentsQuery } from '@/features/contragents/api/contragentsApi'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
//
// import { counterpartiesTotalInfo } from '@/mock/counterparties-total-info'
// import { counterpartiesData } from '@/mock/counterparties-data'
import { mapContragents } from '@/features/contragents/lib/mapContragents'
import { Loader } from '@/shared/ui/Loader'
//

const ContragentsContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllContragentsQuery()

  const counterparties = data?.map((el) => mapContragents(el))

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
          columnDefinitions={contragentsDef}
          rowData={counterparties}
          quickFilterText={value}
          checkboxHidden={false}
        />
      )}

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новый контрагент'>
            <NewContragent />
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

export default ContragentsContent
