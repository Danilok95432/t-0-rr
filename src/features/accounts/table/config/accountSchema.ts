import { z } from 'zod'

export const AccountSchema = z.object({
  account_name: z.string().min(3, 'Введите название счета'),
})
