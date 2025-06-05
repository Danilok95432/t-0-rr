import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { EditContragentForm } from './sections/editContragentForm'
import { AccountsContragent } from './sections/accountsContragent'
import { useParams } from 'react-router'
import { useGetContragentInfoQuery } from '@/features/contragents/api/contragentsApi'
import { mapContragent } from '@/features/contragents/lib/mapContragent'
import { Loader } from '@/shared/ui/Loader'

const ContragentContent = () => {
  const { id = '0' } = useParams()
  const { data } = useGetContragentInfoQuery(id)

  const contragent = data && mapContragent(data)

  console.log(contragent)
  return !contragent ? (
    <Loader />
  ) : (
    <ItemLayout
      labelButton='Вернуться к списку контрагентов'
      pathToBack='contragents'
      title={contragent?.name}
    >
      <EditContragentForm contragent={contragent} id={id} />
      <AccountsContragent accounts={contragent?.accounts} />
    </ItemLayout>
  )
}

export default ContragentContent
