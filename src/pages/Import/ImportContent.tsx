import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { ImportSection } from './sections/ImportSection'

const ImportContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку импортов' pathToBack='imports'>
			<ImportSection />
		</ItemLayout>
	)
}

export default ImportContent
