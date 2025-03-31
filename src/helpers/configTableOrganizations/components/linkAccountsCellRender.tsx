import { CustomCellRendererProps } from 'ag-grid-react'
import { IOrganizationsData } from '@/types/organizationsData'

interface ILinkAccountsCellRender extends CustomCellRendererProps {
	data: IOrganizationsData
}

export const linkAccountsCellRender = ({ data }: ILinkAccountsCellRender) => {
	const linkStyle = { color: 'var(--link)' }

	return (
		<div>
			<span>Всего: {data.accounts.length}</span>{' '}
			{data.accounts.map((el, index) => (
				<a href='#' key={index} style={linkStyle}>
					{el}{' '}
				</a>
			))}
		</div>
	)
}
