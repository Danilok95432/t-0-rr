import { setValue } from '../store/quickFilterSlice'
import { useAppDispatch } from '@/app/store/hooks/useRedux'
import { useAppSelector } from '@/app/store/hooks/useRedux'

export const useQuickFilter = () => {
	const dispatch = useAppDispatch()
	const value = useAppSelector((state) => state.quickFilter.value)

	const handleChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
		if (event) {
			dispatch(setValue(event.target.value))
		}
	}
	return { value, handleChange }
}
