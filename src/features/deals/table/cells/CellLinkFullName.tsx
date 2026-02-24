import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkFullNameParams extends CustomCellRendererProps {
  data: {
    deal_name: string
    id: string
  }
}

export const CellLinkFullName = ({ data }: ICellLinkFullNameParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <Link to={`/deal/${data.id}`} style={linkStyle}>
      {data.deal_name}
    </Link>
  )
}
