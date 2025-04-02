import { CustomCellRendererProps } from 'ag-grid-react'
import { IOrganizationsData } from '@/shared/types/organizationsData'

interface ICellLinkAccountsParams extends CustomCellRendererProps {
	data: IOrganizationsData
}

export const CellLinkAccounts = ({ data }: ICellLinkAccountsParams) => {
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
