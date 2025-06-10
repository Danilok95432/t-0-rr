import { z } from 'zod'
import { TSelectOption } from '@/shared/ui/Select/types'

const SelectOptionSchema: z.ZodType<TSelectOption> = z.object({
  label: z.string(),
  value: z.string(),
})

export const ContragentSchema = z.object({
  name: z.string().min(3, 'Введите контрагента'),
  inn: z.string()
    .min(3, 'ИНН должен содержать минимум 3 цифры')
    .regex(/^\d+$/, 'ИНН должен состоять только из цифр')
    .max(12, 'ИНН может содержать максимум 12 цифр'),
  fullName: z.string().min(3, 'Введите полное имя(название) контрагента'),
  type: z.array(SelectOptionSchema).optional()
})
