import { IActionItem } from '../types'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { useModal } from '@/features/modal/hooks/useModal'
import { useMemo } from 'react'

export const useActionMainItems = (): IActionItem[] => {
  const { isOpenFiltersMenu, handleOpenFilterMenu } = useFiltersMenu()
  const { handleOpenModal } = useModal()
  const { isEditingModeActive, handleActiveEditingMode } = useEditingMode()

  return useMemo(
    () => [
      {
        id: 'editing',
        onClick: handleActiveEditingMode,
        isActive: isEditingModeActive,
        showOnPaths: ['organization', 'counterparty', 'account', 'article', 'case', 'transaction'],
      },
      {
        id: 'add',
        onClick: handleOpenModal,
      },
      {
        id: 'search',
        onClick: handleOpenFilterMenu,
        isActive: isOpenFiltersMenu,
        showOnPaths: ['operations', 'summary'],
      },
      {
        id: 'import',
        onClick: handleOpenModal,
        showOnPaths: [
          'operations',
          'accounts',
          'articles',
          'cases',
          'transactions',
          'imports',
          'import',
          'summary',
        ],
      },
      {
        id: 'unload',
        onClick: handleOpenModal,
        showOnPaths: [
          'operations',
          'organizations',
          'counterparties',
          'accounts',
          'articles',
          'cases',
          'transactions',
          'imports',
          'import',
          'summary',
        ],
      },
      {
        id: 'graph',
        showOnPaths: [
          'operations',
          'accounts',
          'articles',
          'cases',
          'transactions',
          'imports',
          'import',
          'summary',
        ],
      },
    ],
    [
      handleActiveEditingMode,
      handleOpenFilterMenu,
      handleOpenModal,
      isEditingModeActive,
      isOpenFiltersMenu,
    ]
  )
}
