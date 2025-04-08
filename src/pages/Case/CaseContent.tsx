import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainDataCase } from './sections/MainDataCaseSection'

const CaseContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку кейсов' pathToBack='cases'>
			<MainDataCase />
		</ItemLayout>
	)
}

export default CaseContent
