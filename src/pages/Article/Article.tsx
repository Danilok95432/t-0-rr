import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainArticleSection } from './sections/MainArticleSection'

export const Article = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку статей' pathToBack='articles'>
			<MainArticleSection />
		</ItemLayout>
	)
}
