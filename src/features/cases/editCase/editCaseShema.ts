import { z } from 'zod'

export const EditCaseSchema = z.object({
  caseName: z.string().min(3, 'Введите название кейса'),
})
