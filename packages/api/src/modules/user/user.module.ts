import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import User from './user.entity'
import { UserLoader } from './user.loader'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, UserLoader],
  exports: [UserService, UserLoader],
})
export class UserModule {}
