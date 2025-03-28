import type { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/components/Badge'

interface sumCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const sumCellRender = ({ value }: sumCellRendererParams) => {
	if (value[0] === '+') {
		return <Badge label={value} mode='positive' />
	}
	if (value[0] === '-') {
		return <Badge label={value} mode='negative' />
	}
	return <Badge label={value} mode='neutral' />
}
