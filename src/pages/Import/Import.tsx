import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ImportContent = lazy(() => import('./ImportContent'))

export const Import = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ImportContent />
		</Suspense>
	)
}
