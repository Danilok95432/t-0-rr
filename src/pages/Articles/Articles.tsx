import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ArticlesContent = lazy(() => import('./ArticlesContent'))

export const Articles = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ArticlesContent />
		</Suspense>
	)
}
