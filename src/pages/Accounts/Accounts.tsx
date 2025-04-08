import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const AccountsContent = lazy(() => import('./AccountsContent'))

export const Accounts = () => {
	return (
		<Suspense fallback={<Loader />}>
			<AccountsContent />
		</Suspense>
	)
}
