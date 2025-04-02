import { type ColDef } from 'ag-grid-community'
import { ICounterpartiesData } from '@/types/counterpartiesData'

import { linkNameCellRender } from '../configTableOrganizations/components/linkNameCellRender'
import { linkAccountsCellRender } from '../configTableOrganizations/components/linkAccountsCellRender'
import { badgeCellRender } from '../configTableOrganizations/components/badgeCell/badgeCellRender'

export const columnDefCounterparties: ColDef<ICounterpartiesData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название контрагента', flex: 1 },
	{
		field: 'fullName',
		headerName: 'Полное официальное название контрагента',
		cellRenderer: linkNameCellRender,
		flex: 2,
	},
	{ field: 'type', headerName: 'Тип', flex: 1 },
	{ field: 'inn', headerName: 'ИНН', flex: 1 },
	{
		field: 'accounts',
		headerName: 'Счета контрагента',
		cellRenderer: linkAccountsCellRender,
		valueFormatter: (params) => (!params.value.length ? 0 : params.value),
		flex: 2,
	},
	{
		field: 'reputation',
		headerName: 'Репутация',
		cellRenderer: badgeCellRender,
		valueFormatter: (params) => (params.value === null ? {} : params.value),
		cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
		flex: 1,
	},
]
