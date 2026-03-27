import { Link } from 'react-router'
import { CustomCellRendererProps } from 'ag-grid-react'
import { ArrowIconSVG } from '@/shared/ui/icons/arrowIconSVG'

interface ICellLinkNameParams extends CustomCellRendererProps {
  data: {
    title: string
    id: string
    level: string
  }
}

export const CellLinkName = ({ data }: ICellLinkNameParams) => {
  const linkStyle = { color: 'var(--link)', display: 'flex', gap: '15px', alignItems: 'center' }
  if (data.level === 'Подчиненный') {
    return (
      <Link to={`/article/${data.id}`} style={linkStyle}>
				<ArrowIconSVG />
        {data.title}
      </Link>
    )
  }
  return (
    <Link to={`/article/${data.id}`} style={linkStyle}>
      {data.title}
    </Link>
  )
}
