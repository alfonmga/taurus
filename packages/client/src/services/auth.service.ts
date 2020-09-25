import * as taurusApi from '~apis/taurus.api'

export const logOut = async (): Promise<Response> =>
  taurusApi.logoutCurrentUser()
