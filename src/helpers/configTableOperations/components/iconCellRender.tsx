import type { CustomCellRendererProps } from 'ag-grid-react'

import { Icon } from '@/components/Icon'

interface IconCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const iconCellRender = ({ value }: IconCellRendererParams) => {
	return value && <Icon iconId={value} width='28px' height='28px' />
}
