import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { TransactionData } from './sections/TransactionDataSections'

const TransactionContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку транзакций' pathToBack='transactions'>
			<TransactionData />
		</ItemLayout>
	)
}

export default TransactionContent
