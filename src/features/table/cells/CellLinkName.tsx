import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkNameParams extends CustomCellRendererProps {
	data: {
		fullName: {
			path: string
			label: string
		}
		id: string
	}
}

export const CellLinkName = ({ data }: ICellLinkNameParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/${data.fullName.path}/${data.id}`} style={linkStyle}>
			{data.fullName.label}
		</Link>
	)
}
