import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const CaseContent = lazy(() => import('./CaseContent'))

export const Case = () => {
	return (
		<Suspense fallback={<Loader />}>
			<CaseContent />
		</Suspense>
	)
}
