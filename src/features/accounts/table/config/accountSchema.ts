import { z } from 'zod'

export const AccountSchema = z.object({
  account_name: z.string().min(3, 'Введите название счета'),
  bank_name: z.string().min(3, 'Введите название банка'),
  rschet: z.string().min(3, 'Введите номер расчетного счета'),
  bik: z.string().min(3, 'Введите номер БИК'),
  comment: z.string().optional(),
  id_org: z.string(),
})
