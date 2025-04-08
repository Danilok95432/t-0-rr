import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainArticleSection } from './sections/MainArticleSection'

const ArticleContent = () => {
	return (
		<ItemLayout labelButton='Вернуться к списку статей' pathToBack='articles'>
			<MainArticleSection />
		</ItemLayout>
	)
}

export default ArticleContent
