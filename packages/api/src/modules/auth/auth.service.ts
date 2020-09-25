import { Injectable } from '@nestjs/common'

import { UserService } from '~modules/user/user.service'

import { OAuthUserResponse, UserSession } from './auth.interface'
import IAuthService from './auth.service.interface'

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService) {}

  logOut(req: Express.Request): void {
    req.session = null // remove session cookie
  }

  async logIn(user: OAuthUserResponse): Promise<UserSession> {
    const foundExistingUser = await this.userService.findUserByEmailAddress(
      user.email,
    )
    if (foundExistingUser) {
      return { id: foundExistingUser.id }
    }

    const createdUserId = await this.userService.register(user)
    return { id: createdUserId }
  }
}
