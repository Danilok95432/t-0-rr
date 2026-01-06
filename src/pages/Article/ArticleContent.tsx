import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { MainArticleSection } from './sections/MainArticleSection'
import { useParams } from 'react-router-dom'
import { useGetArticleInfoQuery } from '@/features/articles/api/articlesApi'
import { Loader } from '@/shared/ui/Loader'

const ArticleContent = () => {
  const { id = '0' } = useParams()
  const { data: articleData } = useGetArticleInfoQuery(id)

  return !articleData ? (
    <Loader />
  ) : (
    <ItemLayout labelButton='Вернуться к списку статей' pathToBack='articles' title={`Статья «${articleData?.article_name}»`}>
      <MainArticleSection id={id} article={articleData} />
    </ItemLayout>
  )
}

export default ArticleContent
