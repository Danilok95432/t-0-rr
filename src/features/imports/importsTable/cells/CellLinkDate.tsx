import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkDateParams extends CustomCellRendererProps {
	value: {
		date: string
		time: string
	}
	id: string
}

export const CellLinkDate = (params: ICellLinkDateParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/import/${params.data.id}`} style={linkStyle}>
			{params.value.date} {params.value.time}
		</Link>
	)
}
