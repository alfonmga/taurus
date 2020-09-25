import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PaginationDTO } from '../../common/common.dto'
import CreateChatMessageDTO from './chat.dto'
import IChatService from './chat.service.interface'
import { PaginatedChatMessagesDTO } from './chat.types'
import ChatMessage from './chatMessage.entity'

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async paginatedChatMessages(
    paginationDTO: PaginationDTO,
  ): Promise<PaginatedChatMessagesDTO> {
    const totalCount = await this.chatMessageRepository.count()
    const data = await this.chatMessageRepository
      .createQueryBuilder('c')
      .orderBy('c.createdAt', 'DESC')
      .offset(paginationDTO.offset)
      .limit(paginationDTO.limit)
      .getMany()

    return {
      offset: paginationDTO.offset,
      limit: paginationDTO.limit,
      data,
      totalCount,
    }
  }

  /**
   * @return created chat messaged id
   */
  async createChatMessage(
    senderUserId: string,
    dto: CreateChatMessageDTO,
  ): Promise<string> {
    const createdChatMessage = await this.chatMessageRepository
      .create({
        userId: senderUserId,
        message: dto.message,
      })
      .save()

    return createdChatMessage.id
  }
}
