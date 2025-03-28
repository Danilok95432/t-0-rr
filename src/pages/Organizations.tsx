import { useModal } from '@/hooks/useModal'

import { PageLayout } from '@/layouts/PageLayout'
import { Modal } from '@/components/Modal'
import { GridTable } from '@/components/GridTable'
import { NewOrganization } from '@/components/Forms/NewOrganization/NewOrganization'

import { columnDefOrganization } from '@/helpers/configTableOrganizations/columnDefOrganization'
import { organizationsData } from '@/mock/organizations-data'
import { organizationTotalInfo } from '@/mock/organizations-total-info'

export const Organizations = () => {
	const { buttonId } = useModal()

	return (
		<PageLayout title='Организации' totalInfoData={organizationTotalInfo}>
			<GridTable rowData={organizationsData} columnDefinitions={columnDefOrganization} />

			{/* модалки */}
			{buttonId === 'add' && (
				<Modal title='Новая организация'>
					<NewOrganization />
				</Modal>
			)}

			{buttonId === 'unload' && (
				<Modal title='Выгрузка (экспорт) организаций'>Выгрузка организаций</Modal>
			)}
		</PageLayout>
	)
}
