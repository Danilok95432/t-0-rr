import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainDataCase } from './sections/MainDataCaseSection'
import { useGetCaseInfoQuery } from '@/features/cases/api/casesApi'
import { useParams } from 'react-router'

const CaseContent = () => {
  const { id = '0' } = useParams()
  const { data } = useGetCaseInfoQuery(id)

  return (
    <ItemLayout labelButton='Вернуться к списку кейсов' pathToBack='cases' title={data}>
      <MainDataCase case={data ?? ''} id={id} />
    </ItemLayout>
  )
}

export default CaseContent
