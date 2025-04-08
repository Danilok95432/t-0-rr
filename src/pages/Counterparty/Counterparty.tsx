import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const CounterpartyContent = lazy(() => import('./CounterpartyContent'))

export const Counterparty = () => {
	return (
		<Suspense fallback={<Loader />}>
			<CounterpartyContent />
		</Suspense>
	)
}
