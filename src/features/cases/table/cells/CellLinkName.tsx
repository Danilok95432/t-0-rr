import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'
import { ICasesData } from '../config/casesTypes'

interface ICellLinkNameParams extends CustomCellRendererProps {
  data: ICasesData
}

export const CellLinkName = ({ data }: ICellLinkNameParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <Link to={`/case/${data.id}`} style={linkStyle}>
      {data.title}
    </Link>
  )
}
