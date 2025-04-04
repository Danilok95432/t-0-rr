import { ItemLayout } from '@/layouts/ItemLayout'
import { ImportSection } from './sections/ImportSection'

export const Import = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку импортов' pathToBack='imports'>
			<ImportSection />
		</ItemLayout>
	)
}
