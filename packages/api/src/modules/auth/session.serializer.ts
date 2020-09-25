import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import { UserSession } from './auth.interface'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserSession, done: (err: any, id?: any) => void): void {
    done(null, user)
  }

  deserializeUser(
    payload: UserSession,
    done: (err: any, id?: any) => void,
  ): void {
    done(null, payload)
  }
}
