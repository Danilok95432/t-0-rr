import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkNameParams extends CustomCellRendererProps {
	account_name: string
}

export const CellLinkName = ({ data }: ICellLinkNameParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/account/${data.id}`} style={linkStyle}>
			{data.account_name}
		</Link>
	)
}
