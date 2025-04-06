import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './badgeCellStyle.scss'

interface ICellBadgeParams extends CustomCellRendererProps {
	value: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
}

export const CellBadge = ({ value }: ICellBadgeParams) => {
	return <Badge label={value.value} mode={value.status ?? 'neutral'} className='customBadgeCell' />
}
