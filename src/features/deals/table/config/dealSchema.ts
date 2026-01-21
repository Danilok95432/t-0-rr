import { z } from 'zod'

export const DealSchema = z.object({
  deal_short_name: z.string().min(1, 'Введите название сделки').default(''),
  deal_name_full: z.string().min(1, 'Введите полное название сделки').default(''),
})
