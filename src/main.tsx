import { StrictMode, lazy, Suspense } from 'react'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
