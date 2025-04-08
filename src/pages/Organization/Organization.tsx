import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const OrganizationContent = lazy(() => import('./OrganizationContent'))

export const Organization = () => {
	return (
		<Suspense fallback={<Loader />}>
			<OrganizationContent />
		</Suspense>
	)
}
