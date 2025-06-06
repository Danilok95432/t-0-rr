import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkNameParams extends CustomCellRendererProps {
	data: {
		title: string
		id: string
	}
}

export const CellLinkName = ({ data }: ICellLinkNameParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/article/${data.id}`} style={linkStyle}>
			{data.title}
		</Link>
	)
}
