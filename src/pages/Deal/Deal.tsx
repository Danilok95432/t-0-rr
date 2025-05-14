import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const DealContent = lazy(() => import('./DealContent'))

export const Deal = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DealContent />
    </Suspense>
  )
}
