import { Icon } from '@/shared/ui/Icon'

export const CellIconHeader = () => {
	const iconStyle = { width: '16px', height: '16px' }

	return (
		<span style={iconStyle}>
			<Icon iconId='arrows' />
		</span>
	)
}
