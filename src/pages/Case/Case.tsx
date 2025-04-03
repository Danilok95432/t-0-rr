import { ItemLayout } from '@/layouts/ItemLayout'
import { MainDataCase } from './sections/MainDataCaseSection'

export const Case = () => {
	return (
		<ItemLayout
			labelButton='Вернуться к списку кейсов'
			pathToBack='cases'
			title='Разведки разведок по разведкам'
		>
			<MainDataCase />
		</ItemLayout>
	)
}
