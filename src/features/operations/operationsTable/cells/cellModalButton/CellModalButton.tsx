import { Button } from '@/shared/ui/Button'
import { useModal } from '@/features/modal/hooks/useModal'
import type { CustomCellRendererProps } from 'ag-grid-react'

import './cell-button.scss'

interface ICellModalButtonParams extends CustomCellRendererProps {
	value: string
	id: string
}

export const CellModalButton = (params: ICellModalButtonParams) => {
	const { handleOpenModal } = useModal()
	return (
		<Button
			id={`processing-${params.data.id}`}
			mode='clear'
			label={params.value}
			className='cell-button'
			onClick={(event) => handleOpenModal(event)}
		/>
	)
}
