import { useModal } from '@/hooks/useModal'
import { ListLayout } from '@/layouts/ListLayout'
import { NewCase } from '@/components/Forms/NewCase'
import { casesData } from '@/mock/cases-data'
import { GridTable } from '@/shared/ui/GridTable'
import { Modal } from '@/shared/ui/Modal'
import { casesDef } from '@/features/table/configs/casesDef'

import './cases.scss'

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
