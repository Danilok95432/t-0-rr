import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './badgeCellStyle.scss'

interface ICellBadgeParams extends CustomCellRendererProps {
  value: string | null
}

export const CellBadge = ({ value }: ICellBadgeParams) => {
  const mode = (value: string) => {
    if (Number(value) > 0) return 'positive'
    if (Number(value) < 0) return 'negative'
    if (Number(value) === 0) return 'default'
    return 'neutral'
  }

  if (value === null) return null
  return <Badge label={value} mode={mode(value)} className='customBadgeCell' />
}
