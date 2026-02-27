/* eslint-disable @typescript-eslint/no-explicit-any */
// features/filtersMenu/context/dealsFiltersContext.tsx
import React, { ReactNode } from 'react'
import { TFormFilterDealsMenu, MultiSelOption, SelOption } from '@/shared/types/forms'
import { useGetAllFiltersDealQuery } from '@/features/filtersMenu/api/filtersApi'
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

const convertDealsFilterData = (filterData: any): TFormFilterDealsMenu | null => {
  if (!filterData) return null

  const defaultValues: Partial<TFormFilterDealsMenu> = {
    rememberChoice: false,
    deal_date: parseServerDate(filterData.deal_date),
    deal_name: filterData.deal_name || '',
  }

  const multiSelectFields = [
    { key: 'org' as const, data: filterData.org as MultiSelOption[] },
    { key: 'contragent' as const, data: filterData.contragent as MultiSelOption[] },
  ]

  multiSelectFields.forEach(({ key, data }) => {
    if (data?.length > 0) {
      const selectedValues = data.filter((opt) => opt.selected).map((opt) => opt.value)
      if (selectedValues.length > 0) {
        defaultValues[key] = selectedValues
      }
    }
  })

  const singleSelectFields = [
    { key: 'cases' as const, data: filterData.cases as SelOption[] },
  ]

  singleSelectFields.forEach(({ key, data }) => {
    if (data?.length > 0) {
      defaultValues[key] = data[0].value
    }
  })

  return defaultValues as TFormFilterDealsMenu
}

export const DealsFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: filterData, isLoading } = useGetAllFiltersDealQuery()

  return (
    <BaseFiltersProvider<TFormFilterDealsMenu>
      filterData={filterData}
      isLoading={isLoading}
      convertFilterData={convertDealsFilterData}
    >
      {children}
    </BaseFiltersProvider>
  )
}

export const useDealsFilters = () => {
  return useBaseFilters<TFormFilterDealsMenu>()
}
