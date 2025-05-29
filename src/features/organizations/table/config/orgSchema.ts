import { z } from 'zod'

export const OrgSchema = z.object({
  shortName: z.string().min(3, 'Введите название организации').default(''),
  fullName: z.string().min(3, 'Введите полное название организации').default(''),
  inn: z.string().min(3, 'Введите инн').default('').default(''),
  ogrn: z.string().length(13, 'ОГРН должен содержать 13 цифр').default(''),
  legalAddress: z.string().min(5, 'Введите юридический адрес организации').default(''),
  employeesComment: z.string().optional().default(''),
})
