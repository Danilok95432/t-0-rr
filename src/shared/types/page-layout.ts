export interface IItemLayoutProps {
  children?: React.ReactNode
  labelButton?: string
  pathToBack?: string
  title?: string
}

export interface IListLayoutProps {
  title?: string
  children?: React.ReactNode
  totalInfoData?: Record<string, string>[]
}
