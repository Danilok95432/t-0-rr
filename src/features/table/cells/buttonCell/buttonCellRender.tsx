import { Button } from '@/shared/ui/Button'
import { useModal } from '@/hooks/useModal'
import type { CustomCellRendererProps } from 'ag-grid-react'

import './button-cell.scss'

interface linkCellRendererParams extends CustomCellRendererProps {
	value: {
		id: string
		name: string
	}
}

export const ButtonCellRender = ({ value }: linkCellRendererParams) => {
	const { handleOpenModal } = useModal()
	return (
		<Button
			id={`processing-${value.id}`}
			mode='clear'
			label={value.name}
			className='button-cell'
			onClick={(event) => handleOpenModal(event)}
		/>
	)
}
