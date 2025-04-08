import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const AccountContent = lazy(() => import('./AccountContent'))

export const Account = () => {
	return (
		<Suspense fallback={<Loader />}>
			<AccountContent />
		</Suspense>
	)
}
