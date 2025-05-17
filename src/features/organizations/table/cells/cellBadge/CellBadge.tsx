import { CustomCellRendererProps } from 'ag-grid-react'
import { Badge } from '@/shared/ui/Badge'

import './badgeCellStyle.scss'

interface ICellBadgeParams extends CustomCellRendererProps {
  value: string | null
}

export const CellBadge = ({ value }: ICellBadgeParams) => {
  const firstChar = value?.slice(0, 1)

  const mode = (value: string) => {
    if (value === '-') return 'negative'
    if (value === '0') return 'default'
    return 'positive'
  }

  if (value === null) return null
  return <Badge label={value} mode={mode(firstChar || '')} className='customBadgeCell' />
}
