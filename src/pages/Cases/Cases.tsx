import { useModal } from '@/features/modal/hooks/useModal'
import { NewCase } from '@/features/cases/components/NewCase'
import { casesDef } from '@/features/cases/casesTable/config/casesDef'

import { ListLayout } from '@/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

import './cases.scss'

//
import { casesData } from '@/mock/cases-data'
//

export const Cases = () => {
	const { buttonId } = useModal()

	return (
		<ListLayout title='Кейсы' totalInfoData={[]}>
			<GridTable columnDefinitions={casesDef} rowData={casesData} />

			{buttonId === 'add' && (
				<Modal title='Новый кейс' className='modal-cases'>
					<NewCase />
				</Modal>
			)}
		</ListLayout>
	)
}
