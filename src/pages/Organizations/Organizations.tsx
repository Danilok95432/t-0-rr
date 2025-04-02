import { useModal } from '@/hooks/useModal'

import { ListLayout } from '@/layouts/ListLayout'
import { Modal } from '@/components/Modal'
import { GridTable } from '@/components/GridTable'
import { NewOrganization } from '@/components/Forms/NewOrganization/NewOrganization'

import { columnDefOrganization } from '@/helpers/configTableOrganizations/columnDefOrganization'
import { organizationsData } from '@/mock/organizations-data'
import { organizationsTotalInfo } from '@/mock/organizations-total-info'

export const Organizations = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Организации' totalInfoData={organizationsTotalInfo}>
			<GridTable columnDefinitions={columnDefOrganization} rowData={organizationsData} />

			{/* модалки */}
			{buttonId === 'add' && (
				<Modal title='Новая организация'>
					<NewOrganization />
				</Modal>
			)}

			{buttonId === 'unload' && (
				<Modal title='Выгрузка (экспорт) организаций'>Выгрузка организаций</Modal>
			)}
		</ListLayout>
	)
}
