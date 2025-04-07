import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainDataCase } from './sections/MainDataCaseSection'

export const Case = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку кейсов' pathToBack='cases'>
			<MainDataCase />
		</ItemLayout>
	)
}
