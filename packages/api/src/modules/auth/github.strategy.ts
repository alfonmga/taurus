import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, StrategyOptions } from 'passport-github2'

import { AppConfiguration } from '~config'

import { OAuthUserResponse, UserSession } from './auth.interface'
import { AuthService } from './auth.service'

type ValidateCallback = (error: null | true, user: UserSession) => void

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    readonly configService: ConfigService<AppConfiguration>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: `${configService.get('API_URL')}/auth/github/callback`,
    } as StrategyOptions)
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
    done: ValidateCallback,
  ): Promise<void> {
    const loggedUser = await this.authService.logIn({
      provider: profile.provider,
      providerId: profile.id,
      username: profile.username,
      email: profile.emails![0].value,
      avatarUrl: profile.photos![0].value,
      displayName: profile.displayName,
    } as OAuthUserResponse)

    done(null, loggedUser)
  }
}
