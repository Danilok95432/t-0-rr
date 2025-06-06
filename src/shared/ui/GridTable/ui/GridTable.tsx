import { FC, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, DataTypeDefinition, RowSelectionOptions, type Theme } from 'ag-grid-community'
import { AG_GRID_LOCALE_RU } from '../config/ag-grid-locale'
import { TGridTableData } from '../types'
import { customTheme } from '../config/tableTheme'

import '../config/checkbox-style.css'

export const GridTable: FC<TGridTableData> = ({
  rowData,
  columnDefinitions,
  checkboxHidden = true,
  quickFilterText,
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
      />
    </>
  )
}
