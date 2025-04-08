import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ImportsContent = lazy(() => import('./ImportsContent'))

export const Imports = () => {
	return (
		<Suspense fallback={<Loader />}>
			<ImportsContent />
		</Suspense>
	)
}
