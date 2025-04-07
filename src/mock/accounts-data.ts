import { IAccountsData } from '@/features/accounts/table/config/accountsTypes'

export const accountsData: IAccountsData[] = [
	{
		id: '11',
		type: 'Банковский',
		fullName: '4803, Сбер8594, МЦАИ',
		organization: 'МЦАИ ООО',
		bank: 'ЯРОСЛАВСКИЙ Ф-Л ПАО "ПРОМСВЯЗЬБАНК" г. Ярославль',
		paymentAccount: '40702810761000004803',
		bic: '046850649',
		balanceAccounts: { status: 'positive', value: '89 000 000.00' },
	},
	{
		id: '12',
		type: 'Банковский',
		fullName: '4803, Сбер8594, МЦАИ',
		organization: 'АРХ-ПРОЕКТ ООО',
		bank: 'ЯРОСЛАВСКИЙ Ф-Л ПАО "ПРОМСВЯЗЬБАНК" г. Ярославль',
		paymentAccount: '40702810761000004803',
		bic: '046850649',
		balanceAccounts: { status: 'negative', value: '- 89 000 000.00' },
	},
	{
		id: '13',
		type: 'Банковский',
		fullName: '4803, Сбер8594, МЦАИ',
		organization: 'АРХ-ПРОЕКТ ООО',
		bank: 'ЯРОСЛАВСКИЙ Ф-Л ПАО "ПРОМСВЯЗЬБАНК" г. Ярославль',
		paymentAccount: '40702810761000004803',
		bic: '046850649',
		balanceAccounts: { status: 'warning', value: '0.00' },
	},
]
