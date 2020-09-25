import { authModel, AuthModel } from './auth.model'
import { userModel, UserModel } from './user.model'

export interface StoreModel {
  auth: AuthModel
  user: UserModel
}

const model: StoreModel = {
  auth: authModel,
  user: userModel,
}

export default model
