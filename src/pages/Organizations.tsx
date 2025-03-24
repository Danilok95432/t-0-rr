import { PageLayout } from '@/layouts/PageLayout'
import { Modal } from '@/components/Modal'

export const Organizations = () => {
	return (
		<PageLayout title='Организации'>
			Контент
			<Modal title='Новая организация'>Тут форма добавления новой организации</Modal>
		</PageLayout>
	)
}
