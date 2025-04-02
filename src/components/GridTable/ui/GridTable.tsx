import { FC, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { DataTypeDefinition, RowSelectionOptions, type Theme } from 'ag-grid-community'
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

	const dataTypeDefinitions = useMemo<{
		[cellDataType: string]: DataTypeDefinition
	}>(() => {
		return {
			object: {
				baseDataType: 'object',
				extendsDataType: 'object',
				valueParser: (params) => ({ name: params.newValue }),
				valueFormatter: (params) => (params.value == null ? '' : params.value.name),
			},
		}
	}, [])

	return (
		<>
			<FilterMenu />

			<AgGridReact
				ref={gridRef}
				rowData={rowData}
				columnDefs={columnDefinitions}
				dataTypeDefinitions={dataTypeDefinitions}
				rowSelection={rowSelection}
				theme={theme}
			/>
		</>
	)
}
