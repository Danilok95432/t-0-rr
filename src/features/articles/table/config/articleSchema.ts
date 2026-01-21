import { z } from 'zod'

export const ArticleSchema = z.object({
  article_name: z.string().min(3, 'Введите название статьи'),
})
