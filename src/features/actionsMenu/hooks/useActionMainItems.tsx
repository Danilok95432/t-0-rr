import { useModal } from '@/features/modal/hooks/useModal'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'
import { useFiltersMenu } from '@/features/filtersMenu/hooks/useFiltersMenu'
import { IActionItem } from '../types'

const COMMON_PATHS = [
  'operations',
  'accounts',
  'articles',
  'cases',
  'transactions',
  'imports',
  'import',
  'summary',
]

const EDITING_PATHS = ['organization', 'contragent', 'account', 'article', 'case', 'transaction']

export const useActionMainItems = (): IActionItem[] => {
  const { isOpenFiltersMenu, handleOpenFilterMenu } = useFiltersMenu()
  const { handleOpenModal } = useModal()
  const { isEditingModeActive, handleActiveEditingMode } = useEditingMode()

  return [
    {
      id: 'editing',
      onClick: handleActiveEditingMode,
      isActive: isEditingModeActive,
      showOnPaths: EDITING_PATHS,
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
      showOnPaths: COMMON_PATHS,
    },
    {
      id: 'unload',
      onClick: handleOpenModal,
      showOnPaths: [...COMMON_PATHS, 'organizations', 'counterparties'],
    },
    {
      id: 'graph',
      showOnPaths: COMMON_PATHS,
    },
  ]
}
