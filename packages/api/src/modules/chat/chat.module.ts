import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '~modules/user/user.module'

import { ChatResolver } from './chat.resolver'
import { ChatService } from './chat.service'
import ChatMessage from './chatMessage.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), UserModule],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
