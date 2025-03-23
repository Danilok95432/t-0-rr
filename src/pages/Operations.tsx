import { Modal } from '@/components/Modal'
import { GridTable } from '@/components/GridTable'

export const Operations = () => {
	return (
		<>
			<GridTable />
			<Modal title='Новая операция'>Тут форма добавления новой операции</Modal>
		</>
	)
}
