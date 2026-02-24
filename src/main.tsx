import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'

// Ленивая загрузка основного компонента приложения
const App = lazy(() => import('@/app/App'))

// Ленивая загрузка AG Grid
const loadAGGrid = async () => {
  const { AllCommunityModule, ModuleRegistry } = await import('ag-grid-community')
  ModuleRegistry.registerModules([AllCommunityModule])
}

// Загружаем AG Grid после монтирования приложения
loadAGGrid()

// Импорт SVG спрайтов
import 'virtual:svg-icons/register'
import { ToastContainer } from 'react-toastify'
import { FiltersProvider } from './features/filtersMenu/context/filtersContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FiltersProvider>
          <ToastContainer />
          <App />
        </FiltersProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
