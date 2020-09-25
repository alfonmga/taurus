import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { createChatMessageSchema } from '@taurus/shared'
import * as DataLoader from 'dataloader'

import { PaginationDTO } from '~common/common.dto'
import { SuccessfulCreatedType } from '~common/common.types'
import { Loader } from '~common/dataloader'
import { ValidateYupSchema } from '~common/yup-validation'
import GqlAuthenticatedGuard from '~modules/auth/gqlAuthenticated.guard'
import CurrentUserId from '~modules/user/currentUserId.decorator'
import User from '~modules/user/user.entity'
import { UserLoader } from '~modules/user/user.loader'

import CreateChatMessageDTO from './chat.dto'
import { ChatService } from './chat.service'
import { PaginatedChatMessagesDTO } from './chat.types'
import { CreateChatMessageUnion } from './chat.unions'
import ChatMessage from './chatMessage.entity'

@Resolver(() => ChatMessage)
@UseGuards(GqlAuthenticatedGuard)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => CreateChatMessageUnion)
  @ValidateYupSchema(createChatMessageSchema)
  async createChatMessage(
    @CurrentUserId() userId: string,
    @Args('dto') dto: CreateChatMessageDTO,
  ): Promise<typeof CreateChatMessageUnion> {
    const createdChatMessageId = await this.chatService.createChatMessage(
      userId,
      dto,
    )

    return new SuccessfulCreatedType(createdChatMessageId)
  }

  @Query(() => PaginatedChatMessagesDTO)
  async chatMessages(
    @Args('dto') dto: PaginationDTO,
  ): Promise<PaginatedChatMessagesDTO> {
    return this.chatService.paginatedChatMessages(dto)
  }

  @ResolveField()
  async user(
    @Parent() chatMessage: ChatMessage,
    @Loader(UserLoader)
    userLoader: DataLoader<User['id'], User>,
  ): Promise<User> {
    return userLoader.load(chatMessage.userId)
  }
}
