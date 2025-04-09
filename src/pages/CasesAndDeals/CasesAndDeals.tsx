import { Suspense, lazy } from 'react'

import { Loader } from '@/shared/ui/Loader'

const CasesAndDealsContent = lazy(() => import('./CasesAndDealsContent'))

export const CasesAndDeals = () => {
	return (
		<Suspense fallback={<Loader />}>
			<CasesAndDealsContent />
		</Suspense>
	)
}
