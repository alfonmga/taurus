import { SESSION_COOKIE_NAME } from '@taurus/shared'
import Cookies from 'universal-cookie'

import isSSR from '~utils/isSSR'

export const hasSessionCookie = (): boolean =>
  isSSR ? false : !!new Cookies().get(SESSION_COOKIE_NAME)
