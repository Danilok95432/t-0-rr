import { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { RowSelectionOptions, type Theme } from 'ag-grid-community'

import { customTheme } from '../config/tableTheme'
import { columnDefinitions } from '@/pages/Operations/configTable/columnDefinitions'

import { FilterMenu } from '@/components/FilterMenu'

import { rowData } from '@/mock/operations-data'
import '../config/checkbox-style.css'

export const GridTable = () => {
	const theme = useMemo<Theme | 'legacy'>(() => {
		return customTheme
	}, [])

	const rowSelection = useMemo<RowSelectionOptions | 'single' | 'multiple'>(() => {
		return {
			mode: 'multiRow',
			headerCheckbox: true,
		}
	}, [])

	return (
		<>
			<FilterMenu />

			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefinitions}
				rowSelection={rowSelection}
				theme={theme}
			/>
		</>
	)
}
