/* eslint-disable @typescript-eslint/no-explicit-any */
// features/filtersMenu/context/baseFiltersContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface BaseFiltersContextType<T> {
  filters: T | null
  setFilters: (filters: T | null) => void
  isLoading: boolean
  isInitialized: boolean
}

// Создаем контекст с неизвестным типом, который будет определен при использовании
 
const FiltersContext = createContext<BaseFiltersContextType<any> | undefined>(undefined)

interface FiltersProviderProps<T> {
  children: ReactNode
  filterData: any // данные с сервера
  isLoading: boolean
  convertFilterData: (data: any) => T | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryHook?: () => any // опционально, если нужно получать данные внутри
}

export const BaseFiltersProvider = <T,>({
  children,
  filterData,
  isLoading,
  convertFilterData,
}: FiltersProviderProps<T>) => {
  const [filters, setFilters] = useState<T | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (filterData && !isInitialized) {
      const savedFilters = convertFilterData(filterData)

      if (savedFilters) {
        setFilters(savedFilters)
      }

      setIsInitialized(true)
    }
  }, [filterData, isInitialized, convertFilterData])

  return (
    <FiltersContext.Provider value={{ filters, setFilters, isLoading, isInitialized }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useBaseFilters = <T,>(): BaseFiltersContextType<T> => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useBaseFilters must be used within BaseFiltersProvider')
  }
  return context
}
