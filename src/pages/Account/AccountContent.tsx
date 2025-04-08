import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { BalanceAccount } from './sections/BalanceAccountSection'
import { MainDataAccount } from './sections/MainDataAccountSection'
import { MovementsAccount } from './sections/MovementsAccountSection'

const AccountContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку счетов' pathToBack='accounts'>
			<BalanceAccount />
			<MainDataAccount />
			<MovementsAccount />
		</ItemLayout>
	)
}

export default AccountContent
