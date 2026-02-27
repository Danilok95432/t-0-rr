/* eslint-disable @typescript-eslint/no-explicit-any */
// features/filtersMenu/context/operationsFiltersContext.tsx
import React, { ReactNode } from 'react'
import { TFormFilterOperationsMenu, MultiSelOption, SelOption } from '@/shared/types/forms'
import { useGetAllFiltersQuery } from '@/features/filtersMenu/api/filtersApi'
import { BaseFiltersProvider, useBaseFilters } from './baseFiltersContext'

const parseServerDate = (value?: string): Date | undefined => {
  if (!value) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return isNaN(date.getTime()) ? undefined : date
  }
  const date = new Date(value)
  return isNaN(date.getTime()) ? undefined : date
}

const convertOperationsFilterData = (filterData: any): TFormFilterOperationsMenu | null => {
  if (!filterData) return null

  const defaultValues: Partial<TFormFilterOperationsMenu> = {
    rememberChoice: false,
    dateFrom: parseServerDate(filterData.dateFrom),
    dateTo: parseServerDate(filterData.dateTo),
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

export const OperationsFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: filterData, isLoading } = useGetAllFiltersQuery()

  return (
    <BaseFiltersProvider<TFormFilterOperationsMenu>
      filterData={filterData}
      isLoading={isLoading}
      convertFilterData={convertOperationsFilterData}
    >
      {children}
    </BaseFiltersProvider>
  )
}

export const useOperationsFilters = () => {
  return useBaseFilters<TFormFilterOperationsMenu>()
}
