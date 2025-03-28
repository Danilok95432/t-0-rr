import type { CustomCellRendererProps } from 'ag-grid-react'

interface linkCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const linkCellRender = ({ value }: linkCellRendererParams) => {
	const styleLink = { color: 'var(--blue-1)' }
	return (
		<a href='#' style={styleLink}>
			{value}
		</a>
	)
}
