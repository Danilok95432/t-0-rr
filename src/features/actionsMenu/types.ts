import { MouseEvent } from 'react'

export type TActionId =
	| 'editing'
	| 'add'
	| 'search'
	| 'import'
	| 'unload'
	| 'graph'
	| 'mail'
	| 'faq'
	| 'settings'
	| 'delete'

export interface IActionItem {
	id: TActionId
	isActive?: boolean
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	showOnPaths?: string[]
}

export interface IActionButtonProps {
	action: IActionItem
}
