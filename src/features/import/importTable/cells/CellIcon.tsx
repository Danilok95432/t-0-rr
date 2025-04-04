import type { CustomCellRendererProps } from 'ag-grid-react'

import { Icon } from '@/shared/ui/Icon'

interface ICellIconParams extends CustomCellRendererProps {
	value: string
}

export const CellIcon = ({ value }: ICellIconParams) => {
	return value && <Icon iconId={value} width='28px' height='28px' />
}
