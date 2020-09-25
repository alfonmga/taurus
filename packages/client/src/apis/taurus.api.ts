import config from '~config'

export const logoutCurrentUser = (): Promise<Response> =>
  fetch(`${config.API_URL}/auth/logout`, { credentials: 'include' })
