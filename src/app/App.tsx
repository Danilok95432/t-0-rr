import { AppRouter } from './routes/AppRouter'
import { useAuthInit } from '@/features/auth/hooks/useAuthInit'

import { Loader } from '@/shared/ui/Loader'

import './styles/main.scss'

const App = () => {
  const init = useAuthInit()

  if (!init) return <Loader />

  return <div className='app'>{init && <AppRouter />}</div>
}

export default App
