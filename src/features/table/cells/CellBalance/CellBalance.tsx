import type { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './cellBalance.scss'

interface ICellBalanceParams extends CustomCellRendererProps {
	value: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
}

export const CellBalance = ({ value }: ICellBalanceParams) => {
	return <Badge label={value.value} mode={value.status ?? 'neutral'} className='customSumCell' />
}
