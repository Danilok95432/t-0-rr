import { ItemLayout } from '@/layouts/ItemLayout'
import { BalanceAccount } from './sections/BalanceAccountSection'
import { MainDataAccount } from './sections/MainDataAccountSection'
import { MovementsAccount } from './sections/MovementsAccountSection'

export const Account = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку счетов' pathToBack='accounts'>
			<BalanceAccount />
			<MainDataAccount />
			<MovementsAccount />
		</ItemLayout>
	)
}
