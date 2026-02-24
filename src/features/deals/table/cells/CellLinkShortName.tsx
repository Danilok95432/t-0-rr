import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'

interface ICellLinkShortNameParams extends CustomCellRendererProps {
  data: {
    deal_short_name: string
    id: string
  }
}

export const CellLinkShortName = ({ data }: ICellLinkShortNameParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <Link to={`/deal/${data.id}`} style={linkStyle}>
      {data.deal_short_name}
    </Link>
  )
}
