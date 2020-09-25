import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DataLoaderInterceptor } from '~common/dataloader'
import { AuthModule } from '~modules/auth/auth.module'
import { ChatModule } from '~modules/chat/chat.module'
import { UserModule } from '~modules/user/user.module'

import { AppController } from './app.controller'
import config, { AppConfiguration } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        GITHUB_CLIENT_SECRET: Joi.string().required(),
      }),
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration>) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
        autoLoadEntities: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration>) => ({
        autoSchemaFile: `./src/schema.gql`,
        sortSchema: false, // https://github.com/nestjs/graphql/issues/1107#issue-684176036
        context: ({ req }) => ({ req }),
        cors: {
          credentials: true,
          origin: true,
        },
        playground: configService.get('IS_PROD') === false,
        introspection: configService.get('IS_PROD') === false,
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    AuthModule,
    UserModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
