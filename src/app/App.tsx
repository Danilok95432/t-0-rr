import { Header } from '@/shared/ui/Header'
import { AppRouter } from './routes/AppRouter'

import './styles/main.scss'

const App = () => {
	return (
		<div className='app'>
			<Header />
			<AppRouter />
		</div>
	)
}

export default App
