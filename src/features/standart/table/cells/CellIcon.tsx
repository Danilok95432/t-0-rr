import type { CustomCellRendererProps } from 'ag-grid-react'

import { Icon } from '@/shared/ui/Icon'

interface ICellIconParams extends CustomCellRendererProps {
  value: string
}

export const CellIcon = ({ value }: ICellIconParams) => {
  let objValue = 'round'
  if (value === '2') objValue = 'minus'
  else if (value === '1') objValue = 'plus'
  else objValue = 'round'
  return value && <Icon iconId={objValue} width='28px' height='28px' />
}
