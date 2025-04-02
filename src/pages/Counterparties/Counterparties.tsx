import { useModal } from '@/hooks/useModal'

import { ListLayout } from '@/layouts/ListLayout'
import { NewCounterparty } from '@/components/Forms/NewCounterparty'
import { Modal } from '@/components/Modal'
import { GridTable } from '@/components/GridTable'

import { counterpartiesTotalInfo } from '@/mock/counterparties-total-info'
import { columnDefCounterparties } from '@/helpers/configTableCounterparties/columnDefCounterparties'
import { counterpartiesData } from '@/mock/counterparties-data'

export const Counterparties = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Контрагенты' totalInfoData={counterpartiesTotalInfo}>
			<GridTable columnDefinitions={columnDefCounterparties} rowData={counterpartiesData} />

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
