import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewCase } from '@/features/cases/newCase'
import { casesDef } from '@/features/cases/table/config/casesDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

import styles from './cases.module.scss'

//
// import { casesData } from '@/mock/cases-data'
import { useGetAllCasesQuery } from '@/features/cases/api/casesApi'
import { Loader } from '@/shared/ui/Loader'
//

const CasesContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data: cases } = useGetAllCasesQuery()

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
