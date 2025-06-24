import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './badgeCellStyle.scss'

interface ICellBadgeParams extends CustomCellRendererProps {
  value: string
}

export const CellBadge = ({ value }: ICellBadgeParams) => {
	const amount = Number(value)
  return (
    <Badge
      label={value}
      mode={
        amount > 0 ? 'positive' : amount < 0 ? 'negative' : 'neutral'
      }
      className='customBadgeCell'
    />
  )
}
