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
import { casesData } from '@/mock/cases-data'
//

const CasesContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()

  return (
    <ListLayout
      title='Кейсы'
      totalInfoData={[
        {
          name: 'Всего кейсов',
          value: '24',
        },
      ]}
    >
      <GridTable
        columnDefinitions={casesDef}
        rowData={casesData}
        quickFilterText={value}
        checkboxHidden={false}
      />

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
