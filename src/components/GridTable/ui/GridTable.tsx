import { useMemo } from 'react'

import { AgGridReact } from 'ag-grid-react'
import { RowSelectionOptions, type Theme } from 'ag-grid-community'
import { customTheme } from '../config/tableTheme'
import { columnDefinitions } from '../config/columnDefinitions'

import { FilterMenu } from '@/components/FilterMenu'
import { rowData } from '@/pages/Operations/mock/operations-data'

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
