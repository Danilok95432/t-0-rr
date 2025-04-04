import { importDef } from '@/features/import/importTable/config/importDef'
import { GridTable } from '@/shared/ui/GridTable'

import styles from './import.module.scss'
//
import { importData } from '@/mock/import-data'
//

export const ImportSection = () => {
	return (
		<section className={styles.importData}>
			<GridTable columnDefinitions={importDef} rowData={importData} />
		</section>
	)
}
