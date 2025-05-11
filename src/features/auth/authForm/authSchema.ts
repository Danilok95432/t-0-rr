import { z } from 'zod'

export const AuthSchema = z.object({
  user_name: z.string().min(3, 'Введите логин'),
  password: z.string().min(3, 'Введите пароль'),
})
