import { CustomCellRendererProps } from 'ag-grid-react'
import { IOrganizationsData } from '../config/organizationsTypes'

interface ICellLinkAccountsParams extends CustomCellRendererProps {
  data: IOrganizationsData
}

export const CellLinkAccounts = ({ data }: ICellLinkAccountsParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <div>
      <span>Всего: {data?.accounts.length}</span>{' '}
      {data?.accounts.map((account) => (
        <a href='#' key={account.id} style={linkStyle}>
          {account.accountName}
        </a>
      ))}
    </div>
  )
}
