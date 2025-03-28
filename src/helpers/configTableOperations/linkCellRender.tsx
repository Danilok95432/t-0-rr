import type { CustomCellRendererProps } from 'ag-grid-react'

interface linkCellRendererParams extends CustomCellRendererProps {
	value: string
}

export const linkCellRender = ({ value }: linkCellRendererParams) => {
	const styleLink = { color: 'var(--link)' }
	return (
		<a href='#' style={styleLink}>
			{value}
		</a>
	)
}
