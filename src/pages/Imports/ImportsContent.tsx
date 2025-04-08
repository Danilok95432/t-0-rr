import { importsDef } from '@/features/imports/table/configs/importsDef'

import { ListLayout } from '@/shared/layouts/ListLayout'
import { GridTable } from '@/shared/ui/GridTable'
//
import { importsData } from '@/mock/imports-data'
//

const ImportsContent = () => {
	return (
		<ListLayout title='Импорты'>
			<GridTable columnDefinitions={importsDef} rowData={importsData} />
		</ListLayout>
	)
}

export default ImportsContent
