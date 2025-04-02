import { IOrganizationsData } from '@/shared/types/organizationsData'

export const organizationsData: IOrganizationsData[] = [
	{
		id: '11',
		shortName: 'МЦАИ ООО',
		fullName: {
			path: 'organization',
			label:
				'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "МЕЖРЕГИОНАЛЬНЫЙ ЦЕНТР АРХЕОЛОГИЧЕСКИХ ИССЛЕДОВАНИЙ"',
		},
		type: 'Юридическое лицо',
		inn: '6829143499',
		ogrn: '1186820006890',
		accounts: ['4803', 'Сбер8594', 'МЦАИ 0700'],
		balanceAccounts: {
			status: 'positive',
			value: '835 783 222.64',
		},
	},
	{
		id: '12',
		shortName: 'Археопоиск ООО',
		fullName: {
			path: 'organization',
			label: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АРХЕОПОИСК"',
		},
		type: 'Юридическое лицо',
		inn: '5262390741',
		ogrn: '1235200008977',
		accounts: ['4803', 'Сбер8594', 'МЦАИ 0700'],
		balanceAccounts: {
			status: 'positive',
			value: '835 783 222.64',
		},
	},
	{
		id: '13',
		shortName: 'АРХ-ПРОЕКТ ООО',
		fullName: {
			path: 'organization',
			label: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АРХ-ПРОЕКТ"',
		},
		type: 'Юридическое лицо',
		inn: '6829153377',
		ogrn: '1206800000593',
		accounts: ['4803', 'Сбер8594', 'МЦАИ 0700'],
		balanceAccounts: {
			status: 'positive',
			value: '835 783 222.64',
		},
	},
]
