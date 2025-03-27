import { useCallback, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { RowSelectionOptions, type Theme } from 'ag-grid-community'

import { customTheme } from '../config/tableTheme'
import { columnDefinitions } from '@/pages/Operations/configTable/columnDefinitions'

import { FilterMenu } from '@/components/FilterMenu'

import { rowData } from '@/mock/operations-data'
import '../config/checkbox-style.css'
import { Input } from '@/components/Input'

export const GridTable = () => {
	const gridRef = useRef<AgGridReact>(null)
	const theme = useMemo<Theme | 'legacy'>(() => {
		return customTheme
	}, [])

	const rowSelection = useMemo<RowSelectionOptions | 'single' | 'multiple'>(() => {
		return {
			mode: 'multiRow',
			headerCheckbox: true,
		}
	}, [])

	// const onFilterTextBoxChanged = useCallback(() => {
	// 	gridRef.current!.api.setGridOption(
	// 		'quickFilterText',
	// 		(document.getElementById('test') as HTMLInputElement).value
	// 	)
	// }, [])

	return (
		<>
			<FilterMenu />

			<AgGridReact
				ref={gridRef}
				rowData={rowData}
				columnDefs={columnDefinitions}
				rowSelection={rowSelection}
				theme={theme}
			/>
		</>
	)
}
