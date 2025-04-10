import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'
import { FilterOperations } from '@/features/operations/filterOperations'
import { NewOperation } from '@/features/operations/newOperation'
import { UnloadingOperations } from '@/features/operations/unloadingOperations'
import { UploadingOperations } from '@/features/operations/uploadingOperations'
import { SettingsListOperations } from '@/features/operations/settingsListOperations'
import { ProcessingOperation } from '@/features/operations/processingOperation'
import { operationsDef } from '@/features/operations/table/config/operationsDef'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { Modal } from '@/shared/ui/Modal'

// моки
import { operationsTotalInfo } from '@/mock/operations-total-info'
import { operationsData } from '@/mock/operations-data'

const OperationsContent = () => {
	const { buttonId } = useModal()
	const { value } = useQuickFilter()

	return (
		<ListLayout title='Операции' totalInfoData={operationsTotalInfo}>
			<FiltersMenu>
				<FilterOperations />
			</FiltersMenu>

			<GridTable
				rowData={operationsData}
				columnDefinitions={operationsDef}
				quickFilterText={value}
			/>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'add' && (
					<Modal title='Новая операция'>
						<NewOperation />
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'import' && (
					<Modal title='Загрузка (импорт) операций'>
						<UploadingOperations labelBadge='В этой форме производится массовая загрузка (импорт) операций из файла' />
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'unload' && (
					<Modal title='Выгрузка (экспорт) операций'>
						<UnloadingOperations labelBadge='В этом окне Вы можете выгрузить необходимые Вам операции, предварительно настроив список' />
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'settings' && (
					<Modal title='Настройки списка операций'>
						<SettingsListOperations />
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'processing' && (
					<Modal title='Обработка операции'>
						<ProcessingOperation />
					</Modal>
				)}
			</AnimatePresence>
		</ListLayout>
	)
}

export default OperationsContent
