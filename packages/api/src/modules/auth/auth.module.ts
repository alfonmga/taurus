import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '~modules/user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GitHubStrategy } from './github.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [PassportModule.register({ session: true }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, GitHubStrategy, SessionSerializer],
  exports: [AuthService, SessionSerializer],
})
export class AuthModule {}
