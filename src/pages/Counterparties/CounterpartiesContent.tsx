import { AnimatePresence } from 'motion/react'

import { useModal } from '@/features/modal/hooks/useModal'

import { NewCounterparty } from '@/features/counterparties/newCounterparty'
import { counterpartiesDef } from '@/features/counterparties/table/config/counterpartiesDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'
import { useQuickFilter } from '@/features/quickFilter/hooks/useQuickFilter'
//
import { counterpartiesTotalInfo } from '@/mock/counterparties-total-info'
import { counterpartiesData } from '@/mock/counterparties-data'
//

const CounterpartiesContent = () => {
	const { buttonId } = useModal()
	const { value } = useQuickFilter()

	return (
		<ListLayout title='Контрагенты' totalInfoData={counterpartiesTotalInfo}>
			<GridTable
				columnDefinitions={counterpartiesDef}
				rowData={counterpartiesData}
				quickFilterText={value}
			/>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'add' && (
					<Modal title='Новый контрагент'>
						<NewCounterparty />
					</Modal>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
				{buttonId === 'unload' && (
					<Modal title='Выгрузка (экспорт) контрагента'>Выгрузка организаций</Modal>
				)}
			</AnimatePresence>
		</ListLayout>
	)
}

export default CounterpartiesContent
