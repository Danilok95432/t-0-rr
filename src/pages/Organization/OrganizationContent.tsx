import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { OrgMainDataSection } from './sections/OrgMainDataSection'
import { OrgAccountsSection } from './sections/OrgAccountsSection'
import { useGetOrganizationInfoQuery } from '@/features/organizations/api/organizationsApi'
import { useParams } from 'react-router'
import { mapOrganization } from '@/features/organizations/lib/mapOrganization'
import { Loader } from '@/shared/ui/Loader'

const OrganizationContent = () => {
  const { id = '0' } = useParams()
  const { data } = useGetOrganizationInfoQuery(id)

  const organization = data && mapOrganization(data)

  console.log(organization)

  return !organization ? (
    <Loader />
  ) : (
    <ItemLayout
      labelButton='Вернуться к списку организаций'
      pathToBack='organizations'
      title={organization?.shortName}
    >
      <OrgMainDataSection organization={organization} id={id} />
      <OrgAccountsSection accounts={organization?.accounts || []} />
    </ItemLayout>
  )
}

export default OrganizationContent
