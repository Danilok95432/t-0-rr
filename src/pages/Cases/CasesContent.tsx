import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewCase } from '@/features/cases/newCase'
import { casesDef } from '@/features/cases/table/config/casesDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { useGetAllCasesQuery } from '@/features/cases/api/casesApi'
import { mapCases } from '@/features/cases/lib/mapCases'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { Loader } from '@/shared/ui/Loader'

import styles from './cases.module.scss'

//
// import { casesData } from '@/mock/cases-data'
//

const CasesContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllCasesQuery()

  const cases = data?.map((el) => mapCases(el))

  return (
    <ListLayout
      title='Кейсы'
      totalInfoData={[
        {
          name: 'Всего кейсов',
          value: `${cases?.length}`,
        },
      ]}
    >
      {!cases ? (
        <Loader />
      ) : (
        <GridTable
          columnDefinitions={casesDef}
          rowData={cases}
          quickFilterText={value}
          checkboxHidden={false}
        />
      )}

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новый кейс' className={styles.modal_cases}>
            <NewCase />
          </Modal>
        )}
      </AnimatePresence>
    </ListLayout>
  )
}

export default CasesContent
