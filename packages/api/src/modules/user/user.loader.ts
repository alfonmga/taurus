import { Injectable, Scope } from '@nestjs/common'

import { OrderedNestDataLoader } from '../../common/dataloader'
import User from './user.entity'
import { UserService } from './user.service'

@Injectable({ scope: Scope.REQUEST })
export class UserLoader extends OrderedNestDataLoader<User['id'], User> {
  constructor(private readonly userService: UserService) {
    super()
  }

  protected getOptions = (): any => ({
    query: (keys: Array<User['id']>) => this.userService.findByIds(keys),
  })
}
