import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkFullNameParams extends CustomCellRendererProps {
	data: {
		fullName: string
		id: string
	}
}

export const CellLinkFullName = ({ data }: ICellLinkFullNameParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/counterparty/${data.id}`} style={linkStyle}>
			{data.fullName}
		</Link>
	)
}
