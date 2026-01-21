import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const StandartsContent = lazy(() => import('./StandartsContent'))

export const Standarts = () => {
  return (
    <Suspense fallback={<Loader />}>
      <StandartsContent />
    </Suspense>
  )
}
