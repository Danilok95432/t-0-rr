import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const StandartContent = lazy(() => import('./StandartContent'))

export const Standart = () => {
  return (
    <Suspense fallback={<Loader />}>
      <StandartContent />
    </Suspense>
  )
}
