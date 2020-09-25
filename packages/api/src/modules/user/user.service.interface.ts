import { OAuthUserResponse } from '~modules/auth/auth.interface'

import User from './user.entity'
import { UserProfile } from './user.interfaces'

export default interface IUserService {
  register(user: OAuthUserResponse): Promise<string>
  findUserByEmailAddress(email: string): Promise<User | null>
  getUserUserProfile(userId: string): Promise<UserProfile>
  findByIds(ids: readonly string[]): Promise<User[]>
}
