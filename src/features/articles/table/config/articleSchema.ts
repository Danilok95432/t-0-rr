import { TSelectOptionDirection, TSelectOption, TSelectOptionParent } from '@/shared/ui/Select/types'
import { z } from 'zod'

export type ArticleInputs = {
  article_name: string
  article_exps_list?: TSelectOptionDirection[]
  direction?: string
  directions_list?: TSelectOption[]
  parent?: string
  parents_list?: TSelectOptionParent[]
  article_exp_name?: string
  comment?: string
}

export const ArticleSchema = z.object({
  article_name: z.string().min(3, 'Введите название статьи'),
  article_exps_list: z.string().optional(),
  direction: z.string().min(1, "Обязательное поле"),
  directions_list: z.string().optional(),
  parent: z.string().optional(),
  parents_list: z.string().optional(),
  article_exp_name: z.string().optional(),
  comment: z.string().optional(),
})
