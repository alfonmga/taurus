import { action, Action, thunk, Thunk } from 'easy-peasy'

import * as authService from '~services/auth.service'
import { hasSessionCookie } from '~utils/auth.utils'

export interface AuthModel {
  isAuthenticated: boolean
  setIsAuthenticated: Action<AuthModel, boolean>
  logOut: Thunk<AuthModel>
}

export const authModel: AuthModel = {
  isAuthenticated: hasSessionCookie(),
  setIsAuthenticated: action((state, value) => {
    state.isAuthenticated = value
  }),
  logOut: thunk(async actions => {
    await authService.logOut()
    actions.setIsAuthenticated(false)
  }),
}
