import type { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/components/Badge'

import './sumCellStyle.scss'

interface sumCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const sumCellRender = ({ value }: sumCellRendererParams) => {
	if (value[0] === '+') {
		return <Badge label={value} mode='positive' classname='customSumCell' />
	}
	if (value[0] === '-') {
		return <Badge label={value} mode='negative' classname='customSumCell' />
	}
	return <Badge label={value} mode='neutral' classname='customSumCell' />
}
