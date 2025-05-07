export type User = {
  id: string
  username: string
  email: string
}

export interface AuthResponse {
  user: null | User
  accessToken: string | null
}
