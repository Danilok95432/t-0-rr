import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ILinkNameCellRender extends CustomCellRendererProps {
	data: {
		fullName: string
		id: string
	}
}

export const linkNameCellRender = ({ data }: ILinkNameCellRender) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/organization/${data.id}`} style={linkStyle}>
			{data.fullName}
		</Link>
	)
}
