import { useMemo } from 'react'

import { AgGridReact } from 'ag-grid-react'
import { type Theme } from 'ag-grid-community'
import { customTheme } from '../config/tableTheme'
import { columnDefinitions } from '../config/columnDefinitions'

import { FilterMenu } from '@/components/FilterMenu'
import { rowData } from '../mock/operations-data'

export const GridTable = () => {
	const theme = useMemo<Theme | 'legacy'>(() => {
		return customTheme
	}, [])

	return (
		<>
			<FilterMenu />

			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefinitions}
				rowSelection='multiple'
				theme={theme}
			/>
		</>
	)
}
