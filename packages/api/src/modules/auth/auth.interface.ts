export interface OAuthUserResponse {
  provider: string
  providerId: string
  username: string
  email: string
  avatarUrl: string
  displayName: string
}

export interface UserSession {
  id: string
}
