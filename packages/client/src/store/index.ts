import { createTypedHooks, createStore } from 'easy-peasy'

import models, { StoreModel } from './models'

export default createStore(models)

const typedHooks = createTypedHooks<StoreModel>()

export const { useStoreActions } = typedHooks
export const { useStoreDispatch } = typedHooks
export const { useStoreState } = typedHooks
