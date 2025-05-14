import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { DealData } from './sections/DealDataSections'

const TransactionContent = () => {
  return (
    <ItemLayout labelButton='Вернуться к списку сделок' pathToBack='deals'>
      <DealData />
    </ItemLayout>
  )
}

export default TransactionContent
