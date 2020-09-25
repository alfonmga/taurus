import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-core'
import { Observable } from 'rxjs'

@Injectable()
export default class GqlAuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = GqlExecutionContext.create(context).getContext().req

    if (!req.user || !req.user.id) {
      throw new AuthenticationError('Authentication error')
    }

    return true
  }
}
