import { ICasesData } from '@/shared/types/casesData'

export const casesData: ICasesData[] = [
	{
		id: '11',
		fullName: {
			path: 'case',
			label: 'Разделы археология',
		},
		organizations: 'МЦАИ ООО, АРХ-ПРОЕКТ ООО, НПО ТАУ ООО',
		transactions: '4',
		operations: '444',
		balanceAccounts: {
			status: 'positive',
			value: '89 000 000.00',
		},
	},
	{
		id: '22',
		fullName: {
			path: 'case',
			label: 'Раскопки и наблюдения',
		},
		organizations: 'АРХ-ПРОЕКТ ООО',
		transactions: '234',
		operations: '878',
		balanceAccounts: {
			status: 'positive',
			value: '89 000 000.00',
		},
	},
	{
		id: '33',
		fullName: {
			path: 'case',
			label: 'Авторский надзор, научное руководство',
		},
		organizations: 'АРХ-ПРОЕКТ ООО',
		transactions: '8',
		operations: '2',
		balanceAccounts: {
			status: 'warning',
			value: '0.00',
		},
	},
]
