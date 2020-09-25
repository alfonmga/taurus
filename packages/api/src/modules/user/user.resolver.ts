import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import GqlAuthenticatedGuard from '~modules/auth/gqlAuthenticated.guard'

import CurrentUserId from './currentUserId.decorator'
import User from './user.entity'
import { UserProfile } from './user.interfaces'
import { UserService } from './user.service'
import { UserProfileType } from './user.types'

@Resolver(() => User)
@UseGuards(GqlAuthenticatedGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserProfileType)
  async profile(@CurrentUserId() userId: string): Promise<UserProfile> {
    return this.userService.getUserUserProfile(userId)
  }
}
