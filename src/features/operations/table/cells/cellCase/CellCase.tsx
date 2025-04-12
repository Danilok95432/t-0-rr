import type { CustomCellRendererProps } from 'ag-grid-react'

import styles from './cell-case.module.scss'

interface ICellCaseParams extends CustomCellRendererProps {
	value: {
		case: string
		deal: string
	}
}

export const CellCase = ({ value }: ICellCaseParams) => {
	return (
		<>
			<p className={styles.titleCase}>{value.case}</p>
			<p className={styles.subtitleCase}>{value.deal}</p>
		</>
	)
}
