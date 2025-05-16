import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ContragentsContent = lazy(() => import('./ContragentsContent'))

export const Contragents = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContragentsContent />
    </Suspense>
  )
}
