/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class LoginGuard extends AuthGuard('github') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return result
  }

  // Override handleRequest so it never throws an error
  handleRequest(_error: Error, user: any): any {
    return user
  }
}
