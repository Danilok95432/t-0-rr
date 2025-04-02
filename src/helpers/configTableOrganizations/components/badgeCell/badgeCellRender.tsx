import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/components/Badge'

import './badgeCellStyle.scss'

interface badgeCellRendererParams extends CustomCellRendererProps {
	value: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
}

export const badgeCellRender = ({ value }: badgeCellRendererParams) => {
	return <Badge label={value.value} mode={value.status ?? 'neutral'} classname='customBadgeCell' />
}
