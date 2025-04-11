import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainDataCounterparty } from './sections/mainDataCounterpartySection'
import { AccountsCounterparty } from './sections/accountsCounterparty'

const CounterpartyContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку контрагентов' pathToBack='counterparties'>
			<MainDataCounterparty />
			<AccountsCounterparty />
		</ItemLayout>
	)
}

export default CounterpartyContent
