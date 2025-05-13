import { CustomCellRendererProps } from 'ag-grid-react'
import { CasesData } from '../config/casesTypes'

interface ICellLinkOrganizationsParams extends CustomCellRendererProps {
  data: CasesData
}

export const CellLinkOrganizations = ({ data }: ICellLinkOrganizationsParams) => {
  const linkStyle = { color: 'var(--link)' }

  return (
    <div>
      {data.orgs.map((el, index) => (
        <a href='#' key={index} style={linkStyle}>
          {el.title}{' '}
        </a>
      ))}
    </div>
  )
}
