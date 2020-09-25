import User from './user.entity'

export type UserProfile = Pick<User, 'username' | 'avatarUrl' | 'displayName'>
