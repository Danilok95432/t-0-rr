import { TSelectOption, TSelectOptionDirection, TSelectOptionParent } from "@/shared/ui/Select/types"

export interface IArticleArrivalData {
	id: string
	level: string
	title: string
}

export interface IArticleExpenseData {
	id: string
	level: string
	title: string
	type: string
}

export interface IArticleData {
	prihod: IArticleArrivalData[]
	rashod: IArticleExpenseData[]
}

export interface IArticleInfo {
	article_name: string
	article_exps_list: TSelectOptionDirection[]
	direction: string
	directions_list: TSelectOption[]
	parent: {
		id: string
		article_name: string
	}
	parents_list: TSelectOptionParent[]
	article_exp_name: string
	comment: string
}
