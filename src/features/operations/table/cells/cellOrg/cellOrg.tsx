import type { CustomCellRendererProps } from 'ag-grid-react'
import styles from './cell-org.module.scss'

export const CellOrg = (props: CustomCellRendererProps) => {
  // Получаем данные из params.data
  const orgName = props.data?.org_name
  const accountName = props.data?.account_name
  
  return (
    <div className={styles.cellContainer}>
      <p className={styles.titleOrg}>{orgName}</p>
      {accountName && <p className={styles.account}>{accountName}</p>}
    </div>
  )
}