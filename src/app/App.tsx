import { AppRouter } from './routes/AppRouter'
import { useAuthInit } from '@/features/auth/hooks/useAuthInit'

import './styles/main.scss'

const App = () => {
  const init = useAuthInit()

  return <div className='app'>{init && <AppRouter />}</div>
}

export default App
