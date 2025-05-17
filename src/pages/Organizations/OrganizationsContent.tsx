import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { NewOrganization } from '@/features/organizations/newOrganization'
import { organizationDef } from '@/features/organizations/table/config/organizationDef'
import { useGetAllOrganizationsQuery } from '@/features/organizations/api/organizationsApi'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
import { mapOrganizations } from '@/features/organizations/lib/mapOrganizations'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { Loader } from '@/shared/ui/Loader'

//
// import { organizationsData } from '@/mock/organizations-data'
// import { organizationsTotalInfo } from '@/mock/organizations-total-info'
//

const OrganizationsContent = () => {
  const { buttonId } = useModal()
  const { value } = useQuickFilter()
  const { data } = useGetAllOrganizationsQuery()

  const orgs = data?.map((el) => mapOrganizations(el))

  return (
    <ListLayout
      title='Организации'
      totalInfoData={[
        {
          name: 'Всего организаций',
          value: !orgs ? 'Загрузка...' : `${orgs?.length}`,
        },
      ]}
    >
      {!orgs ? (
        <Loader />
      ) : (
        <GridTable
          columnDefinitions={organizationDef}
          rowData={orgs}
          quickFilterText={value}
          checkboxHidden={false}
        />
      )}

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
