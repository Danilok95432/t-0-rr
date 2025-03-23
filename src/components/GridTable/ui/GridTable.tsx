import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { themeQuartz, type ColDef, type RowSelectionOptions, type Theme } from 'ag-grid-community'
import { Icon } from '@/components/Icon'
import { FilterMenu } from '@/components/FilterMenu'
import { CheckBox } from '@/components/CheckBox'

interface IRow {
	id: string
	date: string
	iconType: string
	organization: string
	counterparty: string
	nameOperation: string
	caseAndDeal: string
	article: string
	amount: string
}

const myTheme = themeQuartz.withParams({
	fontSize: 12,
})

export const GridTable = () => {
	const [rowData, setRowData] = useState<IRow[]>([
		{
			id: '367800',
			date: '23.03.2025',
			iconType: '',
			organization: 'ИП Тедорадзе А.С. 2558, Сбер 9042',
			counterparty: 'ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
			nameOperation:
				'Пять платежей по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
			caseAndDeal: 'Начальная Мурманск-22 НОВЫЙ',
			article: 'Заработная плата Выплата аванса 40%',
			amount: '- 835 783 222.64',
		},
		{
			id: '367800',
			date: '23.03.2025',
			iconType: '',
			organization: 'ИП Тедорадзе А.С. 2558, Сбер 9042',
			counterparty: 'ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
			nameOperation:
				'Пять платежей по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
			caseAndDeal: 'Начальная Мурманск-22 НОВЫЙ',
			article: 'Заработная плата Выплата аванса 40%',
			amount: '- 835 783 222.64',
		},
		{
			id: '367800',
			date: '23.03.2025',
			iconType: '',
			organization: 'ИП Тедорадзе А.С. 2558, Сбер 9042',
			counterparty: 'ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
			nameOperation:
				'Пять платежей по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
			caseAndDeal: 'Начальная Мурманск-22 НОВЫЙ',
			article: 'Заработная плата Выплата аванса 40%',
			amount: '- 835 783 222.64',
		},
	])
	const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
		{ field: 'id', headerName: 'ID', minWidth: 80, maxWidth: 80 },
		{ field: 'date', headerName: 'Дата', minWidth: 100, maxWidth: 100 },
		{
			field: 'iconType',
			minWidth: 70,
			maxWidth: 70,
		},
		{ field: 'organization', headerName: 'Организация и счет' },
		{ field: 'counterparty', headerName: 'Контрагент' },
		{ field: 'nameOperation', headerName: 'Наименование операции' },
		{ field: 'caseAndDeal', headerName: 'Кейс и сделка' },
		{ field: 'article', headerName: 'Статья и подстатья' },
		{ field: 'amount', headerName: 'Сумма' },
		{
			field: '',
			checkboxSelection: true,
			headerCheckboxSelection: true,
		},
	])

	const theme = useMemo<Theme | 'legacy'>(() => {
		return myTheme
	}, [])

	return (
		<div className='' style={{ width: '100%', height: '100%' }}>
			<FilterMenu />
			<AgGridReact rowData={rowData} columnDefs={colDefs} rowSelection='multiple' theme={theme} />
		</div>
	)
}
