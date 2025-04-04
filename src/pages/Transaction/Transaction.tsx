import { ItemLayout } from '@/layouts/ItemLayout'
import { TransactionData } from './sections/TransactionDataSections'

export const Transaction = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку транзакций' pathToBack='transactions'>
			<TransactionData />
		</ItemLayout>
	)
}
