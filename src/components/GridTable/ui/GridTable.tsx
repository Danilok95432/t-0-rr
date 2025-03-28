import { FC, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { RowSelectionOptions, type Theme } from 'ag-grid-community'
import { TGridTableData } from '@/types/gridTable'

import { FilterMenu } from '@/components/FilterMenu'

import { customTheme } from '../config/tableTheme'
import '../config/checkbox-style.css'

export const GridTable: FC<TGridTableData> = ({ rowData, columnDefinitions }) => {
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
