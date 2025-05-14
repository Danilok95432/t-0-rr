import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { NewOrganization } from '@/features/organizations/newOrganization'
import { useGetAllOrganizationsQuery } from '@/features/organizations/api/organizationsApi'

import { organizationDef } from '@/features/organizations/table/config/organizationDef'
//
import { organizationsData } from '@/mock/organizations-data'
import { organizationsTotalInfo } from '@/mock/organizations-total-info'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
//

const OrganizationsContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllOrganizationsQuery()

  console.log(data)

  return (
    <ListLayout title='Организации' totalInfoData={organizationsTotalInfo}>
      <GridTable
        columnDefinitions={organizationDef}
        rowData={organizationsData}
        quickFilterText={value}
        checkboxHidden={false}
      />

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'add' && (
          <Modal title='Новая организация'>
            <NewOrganization />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'unload' && (
          <Modal title='Выгрузка (экспорт) организаций'>Выгрузка организаций</Modal>
        )}
      </AnimatePresence>
    </ListLayout>
  )
}

export default OrganizationsContent
