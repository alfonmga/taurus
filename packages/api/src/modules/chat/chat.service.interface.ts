import { PaginationDTO } from '~common/common.dto'

import CreateChatMessageDTO from './chat.dto'
import { PaginatedChatMessagesDTO } from './chat.types'

export default interface IChatService {
  createChatMessage(
    senderUserId: string,
    dto: CreateChatMessageDTO,
  ): Promise<string>
  paginatedChatMessages(
    paginationDTO: PaginationDTO,
  ): Promise<PaginatedChatMessagesDTO>
}
