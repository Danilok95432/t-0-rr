import { ICasesData } from '@/features/cases/table/config/casesTypes'

export const casesData: ICasesData[] = [
	{
		id: '11',
		name: 'Разделы археология',
		organizations: ['МЦАИ ООО', 'АРХ-ПРОЕКТ ООО', 'НПО ТАУ ООО'],
		transactions: '4',
		operations: '444',
		balanceCase: {
			status: 'positive',
			value: '89 000 000.00',
		},
	},
	{
		id: '22',
		name: 'Раскопки и наблюдения',
		organizations: ['АРХ-ПРОЕКТ ООО'],
		transactions: '234',
		operations: '878',
		balanceCase: {
			status: 'positive',
			value: '89 000 000.00',
		},
	},
	{
		id: '33',
		name: 'Авторский надзор, научное руководство',
		organizations: ['АРХ-ПРОЕКТ ООО'],
		transactions: '8',
		operations: '2',
		balanceCase: {
			status: 'warning',
			value: '0.00',
		},
	},
]
