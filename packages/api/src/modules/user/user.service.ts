import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

import { OAuthUserResponse } from '~modules/auth/auth.interface'

import User from './user.entity'
import { UserProfile } from './user.interfaces'
import IUserService from './user.service.interface'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByIds(ids: readonly string[]): Promise<User[]> {
    return this.usersRepository.find({ id: In(ids as string[]) })
  }

  async getUserUserProfile(userId: string): Promise<UserProfile> {
    const user = await this.usersRepository.findOne({ id: userId })
    if (!user) {
      throw new Error(`User not found #${userId}`)
    }

    return {
      username: user.username,
      avatarUrl: user.avatarUrl,
      displayName: user.displayName,
    }
  }

  /**
   * @return created user id
   */
  async register(user: OAuthUserResponse): Promise<string> {
    const createdUser = await this.usersRepository.create(user).save()

    return createdUser.id
  }

  async findUserByEmailAddress(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ email })

    return user || null
  }
}
