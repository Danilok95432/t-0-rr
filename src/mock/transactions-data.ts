import { ITransactionsData } from '@/shared/types/transactionsData'

export const transactionsData: ITransactionsData[] = [
	{
		id: '11',
		shortName: 'Глорекс канализация',
		fullName: 'Длинное название статьи: Проведение капитального ремонта...',
		organization: 'МЦАИ ООО',
		counterparty: 'ИНТЕРФАРМ ООО (5260419882)',
		date: new Date('08.02.2024'),
		amount: '64 636 896,00',
		paid: '64 636 896,00',
		arrears: '64 636 896,00',
		case: 'Разделы археология',
	},
	{
		id: '22',
		shortName: 'Арзамас сети',
		fullName: 'Длинное название статьи: «Культурный слой г. Арзамаса» (XVI – X...',
		organization: 'АРХ-ПРОЕКТ ООО',
		counterparty: 'ООО "СПТ-ГРУПП" (6727037572)',
		date: new Date('08.02.2024'),
		amount: '17 330 000,00',
		paid: '17 330 000,00',
		arrears: '17 330 000,00',
		case: 'Раскопки и наблюдения',
	},
]
