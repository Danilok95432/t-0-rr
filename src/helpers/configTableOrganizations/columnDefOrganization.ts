import { IOrganizationsData } from '@/types/organizationsData'
import { type ColDef } from 'ag-grid-community'

export const columnDefOrganization: ColDef<IOrganizationsData>[] = [
	{ field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
	{ field: 'shortName', headerName: 'Краткое название организации', minWidth: 230, maxWidth: 230 },
	{ field: 'fullName', headerName: 'Полное официальное название организации', flex: 2 },
	{ field: 'type', headerName: 'Тип', flex: 1 },
	{ field: 'inn', headerName: 'ИНН', flex: 1 },
	{ field: 'ogrn', headerName: 'ОГРН', flex: 1 },
	{ field: 'accounts', headerName: 'Счета организации', flex: 1 },
	{
		field: 'balanceAccounts',
		headerName: 'Баланс всех счетов',
		cellStyle: () => {
			return { color: '#106f01' }
		},
		flex: 1,
	},
]
