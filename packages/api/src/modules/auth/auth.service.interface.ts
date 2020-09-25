import { OAuthUserResponse, UserSession } from './auth.interface'

export default interface IAuthService {
  logIn(user: OAuthUserResponse): Promise<UserSession>
  logOut(req: Express.Request): void
}
