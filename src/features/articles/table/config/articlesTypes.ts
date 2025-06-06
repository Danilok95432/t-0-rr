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
	direction: string
	parent: {
		id: string
		article_name: string
	}
	article_exp_name: string
	comment: string
}
