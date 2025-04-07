import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'
import { formatDateTime } from '@/shared/lib/date'

interface ICellLinkDateTimeParams extends CustomCellRendererProps {
	value: string
	id: string
}

export const CellLinkDateTime = (params: ICellLinkDateTimeParams) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<Link to={`/import/${params.data.id}`} style={linkStyle}>
			{formatDateTime(params.value)}
		</Link>
	)
}
