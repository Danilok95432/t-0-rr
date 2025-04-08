import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const TransactionContent = lazy(() => import('./TransactionContent'))

export const Transaction = () => {
	return (
		<Suspense fallback={<Loader />}>
			<TransactionContent />
		</Suspense>
	)
}
