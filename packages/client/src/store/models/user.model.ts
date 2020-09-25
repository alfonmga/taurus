import { action, Action } from 'easy-peasy'

import { UserProfileType } from '~generated/graphql-hooks'

export interface UserModel {
  profile: UserProfileType
  setProfile: Action<UserModel, UserProfileType>
}

export const userModel: UserModel = {
  profile: { avatarUrl: '', displayName: '', username: '' },
  setProfile: action((state, value) => {
    state.profile = value
  }),
}
