import { InputType, Field } from '@nestjs/graphql'
import { CreateChatMessage } from '@taurus/shared'

@InputType()
class CreateChatMessageDTO implements CreateChatMessage {
  @Field()
  message: string
}

export default CreateChatMessageDTO
