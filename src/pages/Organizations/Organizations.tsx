import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const OrganizationsContent = lazy(() => import('./OrganizationsContent'))

export const Organizations = () => {
	return (
		<Suspense fallback={<Loader />}>
			<OrganizationsContent />
		</Suspense>
	)
}
