export interface IItemLayoutProps {
  children?: React.ReactNode
  labelButton?: string
  pathToBack?: string
  title?: string
  isStandart?: boolean
  customText?: string
  customLength?: string
}

export interface IListLayoutProps {
  title?: string
  children?: React.ReactNode
  totalInfoData?: Record<string, string>[]
  noSearch?: boolean
  wideRow?: boolean
}
