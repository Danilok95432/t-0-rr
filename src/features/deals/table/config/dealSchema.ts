import { z } from 'zod'

export const DealSchema = z.object({
  deal_name: z.string().min(3, 'Введите название сделки').default(''),
  dogovor_name: z.string().min(3, 'Введите название/номер договора').default(''),
  deal_name_full: z.string().min(3, 'Введите полное название сделки').default(''),
  org: z.string().min(3, 'Введите название организации').optional(),
  contragent: z.string().min(3, 'Введите название контрагента').optional(),
  case: z.string().min(3, 'Введите название кейса').optional(),
  deal_date: z.string().min(3, 'Введите дату сделки').default(''),
  deal_plan_rashod: z.string().min(3, 'Введите план расходов сделки').default(''),
})
