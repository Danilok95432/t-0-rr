import { CustomCellRendererProps } from 'ag-grid-react'
import { IContragentsData } from '../config/contragentsTypes'

interface ICellLinkAccountsParams extends CustomCellRendererProps {
  data: IContragentsData
}

export const CellLinkAccounts = ({ data }: ICellLinkAccountsParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <div>
      <span>Всего: {data.accounts.length}</span>{' '}
      {data.accounts.map((el, index) => (
        <a href='#' key={index} style={linkStyle}>
          {el.contragent_rschet}{' '}
        </a>
      ))}
    </div>
  )
}
