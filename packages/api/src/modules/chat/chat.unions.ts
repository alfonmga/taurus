import { createUnionType } from '@nestjs/graphql'

import { SuccessfulCreatedType, InputErrorType } from '~common/common.types'

export const CreateChatMessageUnion = createUnionType({
  name: 'CreateChatMessageUnion',
  types: () => [SuccessfulCreatedType, InputErrorType],
})
