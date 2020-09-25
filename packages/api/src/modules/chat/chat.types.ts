import { ObjectType } from '@nestjs/graphql'

import { Paginated } from '~common/common.generics'

import ChatMessage from './chatMessage.entity'

@ObjectType()
export class PaginatedChatMessagesDTO extends Paginated(ChatMessage) {}
