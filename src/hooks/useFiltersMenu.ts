import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeFiltersMenu, openFiltersMenu } from '@/features/filtersMenu/filtersMenuSlice'

export const useFiltersMenu = () => {
	const dispatch = useAppDispatch()

	const { isOpenFiltersMenu } = useAppSelector((state) => state.filterMenu)

	const handleOpenFilterMenu = () => {
		dispatch(openFiltersMenu())
	}

	const handleCloseFilterMenu = () => {
		dispatch(closeFiltersMenu())
	}

	return { isOpenFiltersMenu, handleOpenFilterMenu, handleCloseFilterMenu }
}
