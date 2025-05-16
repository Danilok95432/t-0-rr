import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './cellBadgeStyle.scss'

interface ICellBadgeParams extends CustomCellRendererProps {
  value: {
    status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
    value: string
  }
}

export const CellBadge = ({ value }: ICellBadgeParams) => {
  if (!value.status && !value.value) return null

  return <Badge label={value.value} mode={value.status ?? 'neutral'} className='cell-badge' />
}
