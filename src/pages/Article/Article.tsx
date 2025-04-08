import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ArticleContent = lazy(() => import('./ArticleContent'))

export const Article = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ArticleContent />
		</Suspense>
	)
}
