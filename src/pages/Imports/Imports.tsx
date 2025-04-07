import { useModal } from '@/features/modal/hooks/useModal'
import { importsDef } from '@/features/imports/table/configs/importsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
//
import { importsData } from '@/mock/imports-data'
//

export const Imports = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Импорты'>
			<GridTable columnDefinitions={importsDef} rowData={importsData} />

			{buttonId === 'add' && (
				<Modal title='Новый импорт'>Тут форма добавления нового импорта</Modal>
			)}
		</ListLayout>
	)
}
