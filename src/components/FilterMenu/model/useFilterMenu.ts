import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeFiltersMenu } from '@/features/filtersMenu/filtersMenuSlice'

export const useFilterMenu = () => {
	const dispatch = useAppDispatch()
	const { isOpenFiltersMenu } = useAppSelector((state) => state.filterMenu)

	const handleClose = () => {
		dispatch(closeFiltersMenu())
	}

	return { isOpenFiltersMenu, handleClose }
}
