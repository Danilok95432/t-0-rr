import { ItemLayout } from '@/layouts/ItemLayout'
import { OrgMainDataSection } from './sections/OrgMainDataSection'
import { OrgAccountsSection } from './sections/OrgAccountsSection'

export const Organization = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку организаций' pathToBack='organizations'>
			<OrgMainDataSection />
			<OrgAccountsSection />
		</ItemLayout>
	)
}
