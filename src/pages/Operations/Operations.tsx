import { useModal } from '@/features/modal/hooks/useModal'

import { operationsDef } from '../../features/operations/configs/operationsDef'

import { ListLayout } from '@/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
import { NewOperation } from '@/features/operations/components/NewOperation'
import { UnloadingOperations } from '@/components/Forms/UnloadingOperations'
import { UploadingOperations } from '@/components/Forms/UploadingOperations'
import { SettingsListOperations } from '@/components/Forms/SettingsListOperations'
import { ProcessingOperation } from '@/components/Forms/ProcessingOperation'

import { operationsTotalInfo } from '@/mock/operations-total-info'
import { operationsData } from '@/mock/operations-data'
import { FilterMenu } from '@/features/filtersMenu/components/FilterMenu'

export const Operations = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Операции' totalInfoData={operationsTotalInfo}>
			<FilterMenu />
			<GridTable rowData={operationsData} columnDefinitions={operationsDef} />

			{/* модалки */}
			{buttonId === 'add' && (
				<Modal title='Новая операция'>
					<NewOperation />
				</Modal>
			)}

			{buttonId === 'upload' && (
				<Modal title='Загрузка (импорт) операций'>
					<UploadingOperations labelBadge='В этой форме производится массовая загрузка (импорт) операций из файла' />
				</Modal>
			)}

			{buttonId === 'unload' && (
				<Modal title='Выгрузка (экспорт) операций'>
					<UnloadingOperations labelBadge='В этом окне Вы можете выгрузить необходимые Вам операции, предварительно настроив список' />
				</Modal>
			)}

			{buttonId === 'settings' && (
				<Modal title='Настройки списка операций'>
					<SettingsListOperations />
				</Modal>
			)}

			{buttonId.includes('processing') && (
				<Modal title='Обработка операции'>
					<ProcessingOperation />
				</Modal>
			)}
		</ListLayout>
	)
}
