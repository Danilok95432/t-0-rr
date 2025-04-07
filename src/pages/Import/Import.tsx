import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { ImportSection } from './sections/ImportSection'

export const Import = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку импортов' pathToBack='imports'>
			<ImportSection />
		</ItemLayout>
	)
}
