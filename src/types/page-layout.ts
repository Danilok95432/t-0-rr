export interface IElementPageLayoutProps {
	children?: React.ReactNode
}

export interface IPageLayoutProps extends IElementPageLayoutProps {
	title?: string
	totalInfoData?: Record<string, string>[]
}
