import { useParams } from 'react-router'
import { useGetCaseInfoQuery } from '@/features/cases/api/casesApi'

import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { Loader } from '@/shared/ui/Loader'
import { CaseForm } from '@/features/cases/editCase'

// import { MainDataCase } from './sections/MainDataCaseSection'

const CaseContent = () => {
  const { id = '0' } = useParams()
  const { data } = useGetCaseInfoQuery(id)

  return !data ? (
    <Loader />
  ) : (
    <ItemLayout labelButton='Вернуться к списку кейсов' pathToBack='cases' title={data}>
      <CaseForm caseName={data ?? ''} id={id} />
    </ItemLayout>
  )
}

export default CaseContent
