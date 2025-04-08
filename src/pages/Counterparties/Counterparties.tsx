import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const CounterpartiesContent = lazy(() => import('./CounterpartiesContent'))

export const Counterparties = () => {
	return (
		<Suspense fallback={<Loader />}>
			<CounterpartiesContent />
		</Suspense>
	)
}
