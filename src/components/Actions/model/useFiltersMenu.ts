import { useAppDispatch } from '@/hooks/useRedux'
import { openFiltersMenu } from '@/features/filtersMenu/filtersMenuSlice'

export const useFiltersMenu = () => {
	const dispatch = useAppDispatch()

	const handleOpenFilterMenu = () => {
		dispatch(openFiltersMenu())
	}

	return { handleOpenFilterMenu }
}
