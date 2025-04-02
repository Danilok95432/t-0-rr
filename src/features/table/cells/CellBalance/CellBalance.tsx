import type { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './cellBalance.scss'

interface ICellBalanceParams extends CustomCellRendererProps {
	value: string
}

export const CellBalance = ({ value }: ICellBalanceParams) => {
	if (value[0] === '+') {
		return <Badge label={value} mode='positive' className='customSumCell' />
	}
	if (value[0] === '-') {
		return <Badge label={value} mode='negative' className='customSumCell' />
	}
	return <Badge label={value} mode='neutral' className='customSumCell' />
}
