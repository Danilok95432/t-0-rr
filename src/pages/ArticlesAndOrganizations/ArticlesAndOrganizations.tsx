import { Suspense, lazy } from 'react'

import { Loader } from '@/shared/ui/Loader'

const ArticlesAndOrganizationsContent = lazy(() => import('./ArticlesAndOrganizationsContent'))

export const ArticlesAndOrganizations = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ArticlesAndOrganizationsContent />
		</Suspense>
	)
}
