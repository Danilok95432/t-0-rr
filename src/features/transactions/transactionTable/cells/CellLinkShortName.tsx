import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkShortNameParams extends CustomCellRendererProps {
	data: {
		shortName: string
		id: string
	}
}

export const CellLinkShortName = ({ data }: ICellLinkShortNameParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/transaction/${data.id}`} style={linkStyle}>
			{data.shortName}
		</Link>
	)
}
