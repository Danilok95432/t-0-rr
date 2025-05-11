export type User = {
  id: string
  username: string
  email: string
}

export interface AuthResponse {
  user: null | User
  token: string | null
}
