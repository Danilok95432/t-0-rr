/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  RowClickedEvent,
  RowSelectionOptions,
  GridReadyEvent,
  GridApi,
  type Theme,
  SortChangedEvent,
} from 'ag-grid-community'

import { AG_GRID_LOCALE_RU } from '../config/ag-grid-locale'
import { TGridTableData } from '../types'
import { customTheme } from '../config/tableTheme'

import '../config/checkbox-style.css'

type GridTableProps = {
  onRowClicked?: (event: RowClickedEvent<any>) => void
  onGridReady?: (api: GridApi) => void
  onScrollEnd?: () => void
  onSortChanged?: (event: SortChangedEvent) => void
}

export const GridTable: FC<TGridTableData & GridTableProps> = ({
  rowData,
  columnDefinitions,
  checkboxHidden = true,
  quickFilterText,
  onRowClicked,
  onGridReady,
  onScrollEnd,
  onSortChanged,
}) => {
  const gridRef = useRef<AgGridReact>(null)

  const theme = useMemo<Theme | 'legacy'>(() => customTheme, [])

  const rowSelection = useMemo<RowSelectionOptions>(() => ({
    mode: 'multiRow',
    headerCheckbox: checkboxHidden,
    checkboxes: checkboxHidden,
  }), [checkboxHidden])

  const dataTypeDefinitions = useMemo(() => ({
    object: {
      baseDataType: 'object' as const,
      extendsDataType: 'object' as const,
      valueParser: (params: any) => ({ name: params.newValue }),
      valueFormatter: (params: any) => (params.value == null ? '' : params.value.name),
    },
  }), [])

  const defaultColDef = useMemo<ColDef>(() => ({
    flex: 1,
  }), [])

  const handleGridReady = (params: GridReadyEvent) => {
    onGridReady?.(params.api)
  }

  return (
    <AgGridReact
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefinitions}
      defaultColDef={defaultColDef}
      dataTypeDefinitions={dataTypeDefinitions}
      rowSelection={rowSelection}
      theme={theme}
      quickFilterText={quickFilterText}
      cacheQuickFilter
      tooltipShowDelay={1000}
      tooltipHideDelay={2000}
      localeText={AG_GRID_LOCALE_RU}
      loading={false}
      onRowClicked={onRowClicked}
      onGridReady={handleGridReady}
      onBodyScrollEnd={onScrollEnd}
      onSortChanged={onSortChanged}

      // 🔥 КРИТИЧНО
      getRowId={(params) => params.data.id}
    />
  )
}