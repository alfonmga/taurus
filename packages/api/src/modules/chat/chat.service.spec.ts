import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../../app.module'
import { ChatModule } from './chat.module'
import { ChatService } from './chat.service'

describe('ChatService', () => {
  let service: ChatService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ChatModule],
    }).compile()

    service = module.get<ChatService>(ChatService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
