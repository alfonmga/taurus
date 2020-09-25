import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SESSION_COOKIE_NAME } from '@taurus/shared'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import passport from 'passport'

import { AppModule } from './app.module'
import { AppConfiguration } from './config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService: ConfigService<AppConfiguration> = app.get(ConfigService)

  const HOST = configService.get('HOST')
  const PORT = configService.get('PORT')
  const APP_URL = configService.get('APP_URL')
  const IS_PROD = configService.get('IS_PROD')
  const SESSION_SECRET = configService.get('SESSION_SECRET')

  if (IS_PROD) {
    app.set('trust proxy', 1) // we need this because Dokku uses Nginx
    app.use(helmet())
  }

  app.enableCors({
    origin: APP_URL,
    credentials: true,
  })
  app.use(cookieParser(SESSION_SECRET))
  app.use(
    cookieSession({
      name: SESSION_COOKIE_NAME,
      secret: SESSION_SECRET,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours,
      path: '/',
      domain: configService.get('COOKIE_SESSION_DOMAIN'),
      secure: configService.get('COOKIE_SESSION_SECURE'),
      signed: true,
      httpOnly: false, // in a real application we would implement this https://stackoverflow.com/a/51965652/3971297
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, HOST, async () => {
    Logger.log(`listening on http://${HOST}:${PORT}`)
  })
}

bootstrap()
