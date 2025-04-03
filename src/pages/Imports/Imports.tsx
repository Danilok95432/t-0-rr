import { useModal } from '@/hooks/useModal'
import { ListLayout } from '@/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
import { importsDef } from '@/features/table/configs/importsDef'

import { Modal } from '@/shared/ui/Modal'

export const Imports = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Импорты'>
			<GridTable columnDefinitions={importsDef} />

			{buttonId === 'add' && (
				<Modal title='Новый импорт'>Тут форма добавления нового импорта</Modal>
			)}
		</ListLayout>
	)
}
