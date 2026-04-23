import type { CustomCellRendererProps } from 'ag-grid-react'

import styles from './cell-case.module.scss'
import { useNavigate } from 'react-router'

interface ICellCaseParams extends CustomCellRendererProps {
  value: {
    case: string
    deal: string
		idDeal: string
  }
}

export const CellCase = ({ value }: ICellCaseParams) => {
  const navigate = useNavigate()

  const handleCaseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value?.idDeal) return

    navigate(`/deal/${value.idDeal}`)
  }
  return (
    <>
      <button onClick={handleCaseClick}>
        <p className={styles.titleCase}>{value.case}</p>
        <p className={styles.subtitleCase}>{value.deal}</p>
      </button>
    </>
  )
}
