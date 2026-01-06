import { FC, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, DataTypeDefinition, RowClickedEvent, RowSelectionOptions, type Theme } from 'ag-grid-community'
import { AG_GRID_LOCALE_RU } from '../config/ag-grid-locale'
import { TGridTableData } from '../types'
import { customTheme } from '../config/tableTheme'

import '../config/checkbox-style.css'

type GridTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClicked?: (event: RowClickedEvent<any>) => void
}

export const GridTable: FC<TGridTableData & GridTableProps> = ({
  rowData,
  columnDefinitions,
  checkboxHidden = true,
  quickFilterText,
  onRowClicked
}) => {
  const gridRef = useRef<AgGridReact>(null)
  const theme = useMemo<Theme | 'legacy'>(() => {
    return customTheme
  }, [])
  const localeText = AG_GRID_LOCALE_RU

  const rowSelection = useMemo<RowSelectionOptions | 'single' | 'multiple'>(() => {
    return {
      mode: 'multiRow',
      headerCheckbox: checkboxHidden,
      checkboxes: checkboxHidden,
    }
  }, [checkboxHidden])

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

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  return (
    <>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefinitions}
        defaultColDef={defaultColDef}
        dataTypeDefinitions={dataTypeDefinitions}
        rowSelection={rowSelection}
        theme={theme}
        quickFilterText={quickFilterText}
        cacheQuickFilter={true}
        tooltipShowDelay={1000}
        tooltipHideDelay={2000}
        localeText={localeText}
        loading={false}
        onRowClicked={onRowClicked}
      />
    </>
  )
}
