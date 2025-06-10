import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { useGetDealInfoQuery } from '@/features/deals/api/dealsApi'
import { useParams } from 'react-router-dom'
import { EditDealForm } from '@/features/deals/editDeal/EditDealForm'
import { Loader } from '@/shared/ui/Loader'

const TransactionContent = () => {
  const { id = '0' } = useParams()
  const { data: dealInfo } = useGetDealInfoQuery(id)

  return !dealInfo ? (
      <Loader />
    ) : (
      <ItemLayout
        labelButton='Вернуться к списку сделок'
        pathToBack='deals'
      >
        <EditDealForm deal={dealInfo} id={id} />
      </ItemLayout>
    )
}

export default TransactionContent
