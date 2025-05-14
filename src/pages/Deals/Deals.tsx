import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const DealsContent = lazy(() => import('./DealsContent'))

export const Deals = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DealsContent />
    </Suspense>
  )
}
