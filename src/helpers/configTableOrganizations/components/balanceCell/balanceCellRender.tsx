import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/components/Badge'

import './balanceCellStyle.scss'

interface balanceCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const balanceCellRender = ({ value }: balanceCellRendererParams) => {
	return <Badge label={value} mode='positive' classname='customBalanceCell' />
}
