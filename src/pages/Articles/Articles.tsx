import { useModal } from '@/features/modal/hooks/useModal'
import { ListLayout } from '@/layouts/ListLayout'

import { Modal } from '@/shared/ui/Modal'

export const Articles = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Статьи' totalInfoData={[]}>
			<Modal title='Новая статья'>Тут форма добавления новой статьи</Modal>
		</ListLayout>
	)
}
