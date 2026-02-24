// features/filtersMenu/context/filtersContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import type { TFormFilterOperationsMenu } from '@/shared/types/forms'
import { useGetAllFiltersQuery } from '@/features/filtersMenu/api/filtersApi'
import type { MultiSelOption, SelOption } from '@/shared/types/forms'

interface FiltersContextType {
  filters: TFormFilterOperationsMenu | null
  setFilters: (filters: TFormFilterOperationsMenu | null) => void
  isLoading: boolean
  isInitialized: boolean // Добавляем флаг инициализации
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<TFormFilterOperationsMenu | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data: filterData, isLoading } = useGetAllFiltersQuery()

  // Функция для преобразования данных из filterData в TFormFilterOperationsMenu
  const convertFilterDataToFormValues = (): TFormFilterOperationsMenu | null => {
    if (!filterData) return null

    const defaultValues: Partial<TFormFilterOperationsMenu> = {
      rememberChoice: false,
    }

    // Мультиселекты
    const multiSelectFields = [
      { key: 'org' as const, data: filterData.org as MultiSelOption[] },
      { key: 'account' as const, data: filterData.account as MultiSelOption[] },
      { key: 'contragent' as const, data: filterData.contragent as MultiSelOption[] },
      { key: 'directions' as const, data: filterData.directions as MultiSelOption[] },
    ]

    multiSelectFields.forEach(({ key, data }) => {
      if (data?.length > 0) {
        const selectedValues = data.filter((opt) => opt.selected).map((opt) => opt.value)
        if (selectedValues.length > 0) {
          defaultValues[key] = selectedValues
        }
      }
    })

    // Обычные селекты
    const singleSelectFields = [
      { key: 'article' as const, data: filterData.article as SelOption[] },
      { key: 'cases' as const, data: filterData.cases as SelOption[] },
      { key: 'deals' as const, data: filterData.deals as SelOption[] },
    ]

    singleSelectFields.forEach(({ key, data }) => {
      if (data?.length > 0) {
        defaultValues[key] = data[0].value
      }
    })

    return defaultValues as TFormFilterOperationsMenu
  }

  // При загрузке filterData автоматически устанавливаем сохраненные фильтры
  useEffect(() => {
    if (filterData && !isInitialized) {
      const savedFilters = convertFilterDataToFormValues()
      
      if (savedFilters) {
        setFilters(savedFilters)
      }
      
      setIsInitialized(true)
    }
  }, [filterData, isInitialized])

  return (
    <FiltersContext.Provider value={{ filters, setFilters, isLoading, isInitialized }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider')
  }
  return context
}
