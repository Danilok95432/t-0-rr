import { useModal } from '@/features/modal/hooks/useModal'

import { NewCounterparty } from '@/features/counterparties/newCounterparty'
import { counterpartiesDef } from '@/features/counterparties/table/config/counterpartiesDef'

import { ListLayout } from '@/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

//
import { counterpartiesTotalInfo } from '@/mock/counterparties-total-info'
import { counterpartiesData } from '@/mock/counterparties-data'
//

export const Counterparties = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Контрагенты' totalInfoData={counterpartiesTotalInfo}>
			<GridTable columnDefinitions={counterpartiesDef} rowData={counterpartiesData} />

			{/* модалки */}
			{buttonId === 'add' && (
				<Modal title='Новый контрагент'>
					<NewCounterparty />
				</Modal>
			)}

			{buttonId === 'unload' && (
				<Modal title='Выгрузка (экспорт) контрагента'>Выгрузка организаций</Modal>
			)}
		</ListLayout>
	)
}
