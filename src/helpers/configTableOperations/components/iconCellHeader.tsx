import { Icon } from '@/components/Icon'

const iconCellHeader = () => {
	const iconStyle = { width: '16px', height: '16px' }

	return (
		<span style={iconStyle}>
			<Icon iconId='arrows' />
		</span>
	)
}

export default iconCellHeader
