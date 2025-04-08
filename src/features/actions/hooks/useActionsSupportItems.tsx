import { useModal } from '@/features/modal/hooks/useModal'
import { IActionItem } from '../types'

export const useActionsSupportItems = (): IActionItem[] => {
	const { handleOpenModal } = useModal()

	return [
		{
			id: 'mail',
		},
		{
			id: 'faq',
		},
		{
			id: 'settings',
			onClick: handleOpenModal,
		},
	]
}
