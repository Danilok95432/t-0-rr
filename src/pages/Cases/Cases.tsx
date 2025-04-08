import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const CasesContent = lazy(() => import('./CasesContent'))

export const Cases = () => {
	return (
		<Suspense fallback={<Loader />}>
			<CasesContent />
		</Suspense>
	)
}
