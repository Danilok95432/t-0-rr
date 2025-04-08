import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const OperationsContent = lazy(() => import('./OperationsContent'))

export const Operations = () => {
	return (
		<Suspense fallback={<Loader />}>
			<OperationsContent />
		</Suspense>
	)
}
