import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import LoginGuard from './login.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  private handleOAuthCallbackRedirect(
    res: Response,
    user?: Express.User,
  ): void {
    let redirectTo = this.configService.get('APP_URL')
    if (!user) {
      redirectTo += '/error=AUTHENTICATION'
    }

    res.redirect(redirectTo)
  }

  @Get('github/login')
  @UseGuards(LoginGuard)
  login(): void {
    // this statement is never reached because it does a redirection to the OAuth provider
  }

  @Get('github/callback')
  @UseGuards(LoginGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response): void {
    this.handleOAuthCallbackRedirect(res, req.user)
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response): void {
    this.authService.logOut(req)
    res.send()
  }
}
