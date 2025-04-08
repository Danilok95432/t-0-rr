import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const TransactionsContent = lazy(() => import('./TransactionsContent'))

export const Transactions = () => {
	return (
		<Suspense fallback={<Loader />}>
			<TransactionsContent />
		</Suspense>
	)
}
