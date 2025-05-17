import { z } from 'zod'

export const CaseSchema = z.object({
  caseName: z.string().min(3, 'Введите название кейса'),
})
