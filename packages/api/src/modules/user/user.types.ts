import { ObjectType, PickType } from '@nestjs/graphql'

import User from './user.entity'

@ObjectType()
export class UserProfileType extends PickType(User, [
  'username',
  'avatarUrl',
  'displayName',
] as const) {}
