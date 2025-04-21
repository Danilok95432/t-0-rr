import type { CustomCellRendererProps } from 'ag-grid-react'
import styles from './cell-org.module.scss'

interface ICellArticleParams extends CustomCellRendererProps {
  value: {
    name: string
    account: string
  }
}

export const CellOrg = ({ value }: ICellArticleParams) => {
  return (
    <>
      <p className={styles.titleOrg}>{value.name}</p>
      <p className={styles.account}>{value.account}</p>
    </>
  )
}
