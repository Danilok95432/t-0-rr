import type { CustomCellRendererProps } from 'ag-grid-react'

import { Icon } from '@/components/Icon'

interface IconCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const iconRenderCell = ({ value }: IconCellRendererParams) => {
	const styleIcon = { width: '16px', height: '16px' }

	return (
		value && (
			<div style={styleIcon}>
				<Icon iconId={value} />
			</div>
		)
	)
}
