import { Suspense, lazy } from 'react'
import { Loader } from '@/shared/ui/Loader'

const ContragentContent = lazy(() => import('./ContragentContent'))

export const Contragent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContragentContent />
    </Suspense>
  )
}
