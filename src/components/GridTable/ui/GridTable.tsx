import { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { RowSelectionOptions, type Theme } from 'ag-grid-community'

import { rowData } from '@/pages/Operations/mock/operations-data'
import { FilterMenu } from '@/components/FilterMenu'

import { customTheme } from '../config/tableTheme'
import { columnDefinitions } from '@/pages/Operations/configTable/columnDefinitions'

export const GridTable = () => {
	const theme = useMemo<Theme | 'legacy'>(() => {
		return customTheme
	}, [])

	const rowSelection = useMemo<RowSelectionOptions | 'single' | 'multiple'>(() => {
		return {
			mode: 'multiRow',
			headerCheckbox: true,
			checkboxLocation: 'selectionColumn',
		}
	}, [])

	return (
		<>
			<FilterMenu />

			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefinitions}
				// defaultColDef={}
				rowSelection={rowSelection}
				theme={theme}
			/>
		</>
	)
}
