import { useModal } from '@/features/modal/hooks/useModal'
import { NewCase } from '@/features/cases/newCase'
import { casesDef } from '@/features/cases/table/config/casesDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { Modal } from '@/shared/ui/Modal'
import { GridTable } from '@/shared/ui/GridTable'

import './cases.scss'

//
import { casesData } from '@/mock/cases-data'
//

const CasesContent = () => {
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

export default CasesContent
