import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainDataCounterparty } from './sections/MainDataCounterpartySection'
import { AccountsCounterparty } from './sections/AccountsCounterpartySection'

export const Counterparty = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку контрагентов' pathToBack='counterparties'>
			<MainDataCounterparty />
			<AccountsCounterparty />
		</ItemLayout>
	)
}
