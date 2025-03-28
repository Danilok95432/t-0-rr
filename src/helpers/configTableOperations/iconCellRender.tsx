import type { CustomCellRendererProps } from 'ag-grid-react'

import { Icon } from '@/components/Icon'

interface IconCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const iconCellRender = ({ value }: IconCellRendererParams) => {
	const styleIcon = { width: '28px', height: '24px' }

	return (
		value && (
			<div style={styleIcon}>
				<Icon iconId={value} />
			</div>
		)
	)
}
