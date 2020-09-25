import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../../app.module'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
