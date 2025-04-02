export interface IItemLayoutProps {
	children?: React.ReactNode
	labelButton?: string
	pathToBack?: string
}

export interface IListLayoutProps {
	title?: string
	children?: React.ReactNode
	totalInfoData?: Record<string, string>[]
}
