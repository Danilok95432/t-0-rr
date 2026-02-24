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
	const formatNumber = (numStr: string) => {
		// Проверяем, является ли число отрицательным
		const isNegative = numStr.startsWith('-')
		const absNumStr = isNegative ? numStr.substring(1) : numStr
		
		// Разделяем на целую и дробную части
		const parts = absNumStr.split('.')
		const integerPart = parts[0]
		const decimalPart = parts.length > 1 ? `.${parts[1]}` : ''
		
		// Форматируем только целую часть с разделителями тысяч
		const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		
		return (isNegative ? '-' : '') + formattedInteger + decimalPart
	}

	const formattedValue = formatNumber(value.value)

	return <Badge label={formattedValue} mode={value.status ?? 'neutral'} className='customBadgeCell' />
}