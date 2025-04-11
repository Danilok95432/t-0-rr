import type { CustomTooltipProps } from 'ag-grid-react'

import './custom-tooltip.css'

export const CustomTooltip = (props: CustomTooltipProps) => {
	return (
		<div className='custom-tooltip'>
			<span>{props.value}</span>
		</div>
	)
}
